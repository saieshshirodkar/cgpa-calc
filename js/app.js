import { appState } from './core/state.js';
import { router } from './core/router.js';
import { storage } from './services/storage.js';
import { calculator } from './services/calculator.js';
import { DATA } from './config/data.js';
import { BRANCHES, STEPS } from './config/constants.js';
import { initBackground } from './effects/background.js';
import { createToastContainer, showToast, shakeInput } from './utils/helpers.js';
import { updateProgress } from './ui/progress.js';
import { renderBranchSelection as renderBranchComponent } from './ui/components/branch.js';
import { renderSemesterSelection as renderSemesterComponent } from './ui/components/semester.js';
import { renderTrackSelection as renderTrackComponent, renderSlotSelection as renderSlotComponent } from './ui/components/elective.js';
import { renderMarksInput as renderMarksComponent } from './ui/components/marks.js';
import { renderResults as renderResultsComponent } from './ui/components/results.js';

class GradeCalcApp {
  constructor() {
    this.mainContent = document.getElementById('main-content');
    console.log('mainContent:', this.mainContent);
    this.init();
  }

  init() {
    createToastContainer();
    initBackground();
    this.setupRouter();
    this.loadSavedState();
    this.setupGlobalEvents();
  }

  setupRouter() {
    router.on(STEPS.BRANCH, () => this.goToBranch());
    router.on(STEPS.SEMESTER, () => this.goToSemester());
    router.on(STEPS.ELECTIVE, () => this.goToElective());
    router.on(STEPS.MARKS, () => this.goToMarks());
    router.on(STEPS.RESULT, (state) => this.goToResult(state?.sgpa));
    router.init();
  }

  loadSavedState() {
    const saved = storage.load();
    if (saved) {
      if (saved.branch && !DATA[saved.branch]) {
        storage.clear();
        this.renderBranchSelection();
        return;
      }

      Object.assign(appState.get(), saved);

      if (appState.get().branch && appState.get().sem) {
        const semData = this.getSemData();
        if (!semData) {
          appState.set('sem', null);
          this.renderSemesterSelection();
        } else if (this.isElectiveSelectionComplete()) {
          this.renderMarksInput();
        } else {
          this.renderElectiveSelection();
        }
      } else if (appState.get().branch) {
        this.renderSemesterSelection();
      } else {
        this.renderBranchSelection();
      }
    } else {
      this.renderBranchSelection();
    }
  }

  setupGlobalEvents() {
    document.body.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.target.classList.contains('mark-input')) {
        e.preventDefault();
        const inputs = Array.from(document.querySelectorAll('.mark-input'));
        const index = inputs.indexOf(e.target);
        if (index > -1 && index < inputs.length - 1) {
          inputs[index + 1].focus();
        } else if (index === inputs.length - 1) {
          this.calculateSGPA();
        }
      }
    });

    document.querySelector('h1').addEventListener('click', () => this.restart());
  }

  getSemData() {
    const state = appState.get();
    if (!state.branch || !state.sem) return null;
    return DATA[state.branch]?.[state.sem] || null;
  }

  isElectiveSelectionComplete() {
    const state = appState.get();
    if (!state.sem) return false;
    const semData = DATA[state.branch][state.sem];

    if (!semData.electives || Object.keys(semData.electives).length === 0) return true;

    if (semData.electiveMode === 'track') return !!state.track;
    if (semData.electiveMode === 'slot') {
      const slots = Object.keys(semData.electives);
      return slots.every(s => !!state.electiveSelections[s]);
    }
    return false;
  }

  getSubjects() {
    const semData = this.getSemData();
    if (!semData) return [];

    let subjects = [...semData.common];
    const state = appState.get();

    if (semData.electiveMode === 'track' && state.track) {
      subjects = [...subjects, ...semData.electives[state.track]];
    } else if (semData.electiveMode === 'slot') {
      Object.keys(semData.electives).forEach(slot => {
        const code = state.electiveSelections[slot];
        const sub = semData.electives[slot].find(s => s.code === code);
        if (sub) subjects.push(sub);
      });
    }

    return subjects;
  }

  save() {
    storage.save(appState.get());
  }

  renderBranchSelection() {
    console.log('renderBranchSelection called');
    router.push(STEPS.BRANCH);
    updateProgress(STEPS.BRANCH);
    
    renderBranchComponent(this.mainContent, (branch) => {
      appState.set('branch', branch);
      this.save();
      this.renderSemesterSelection();
    });
  }

  renderSemesterSelection() {
    router.push(STEPS.SEMESTER);
    updateProgress(STEPS.SEMESTER);
    
    renderSemesterComponent(this.mainContent, appState.get().branch, (sem) => {
      appState.set('sem', sem);
      appState.set('electiveSelections', {});
      appState.set('track', null);
      this.save();
      this.renderElectiveSelection();
    }, () => {
      router.back();
    });
  }

  renderElectiveSelection() {
    const semData = this.getSemData();
    
    if (!semData.electives || Object.keys(semData.electives).length === 0) {
      this.renderMarksInput();
      return;
    }

    router.push(STEPS.ELECTIVE);
    updateProgress(STEPS.ELECTIVE);

    if (semData.electiveMode === 'track') {
      renderTrackComponent(this.mainContent, semData, (track) => {
        appState.set('track', track);
        this.save();
        this.renderMarksInput();
      }, () => {
        router.back();
      });
    } else if (semData.electiveMode === 'slot') {
      renderSlotComponent(this.mainContent, semData, appState.get().electiveSelections,
        (slot, code) => {
          const selections = { ...appState.get().electiveSelections, [slot]: code };
          appState.set('electiveSelections', selections);
          this.save();
        },
        () => this.renderMarksInput(),
        () => router.back()
      );
    }
  }

  renderMarksInput() {
    router.push(STEPS.MARKS);
    updateProgress(STEPS.MARKS);

    const subjects = this.getSubjects();

    renderMarksComponent(
      this.mainContent,
      subjects,
      appState.get().marks,
      (code, value) => {
        appState.updateMark(code, value);
        this.save();
      },
      () => this.calculateSGPA(),
      () => router.back(),
      () => this.fillRandomMarks(),
      () => this.resetAllMarks()
    );

    document.querySelector('.predict-btn').addEventListener('click', () => this.solveForTarget());
  }

  calculateSGPA() {
    const subjects = this.getSubjects();
    const result = calculator.calculateSGPA(subjects, appState.get().marks);

    if (result.error) {
      if (result.error === 'incomplete') {
        const emptyInputs = Array.from(document.querySelectorAll('.mark-input')).filter(input => !input.value);
        if (emptyInputs.length > 0) {
          emptyInputs[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
          emptyInputs[0].focus();
          shakeInput(emptyInputs[0]);
        }
        showToast('Please fill in all fields', 3000, 'error');
      } else if (result.error === 'negative') {
        showToast('Marks cannot be negative', 3000, 'error');
      } else if (result.error === 'exceeds') {
        showToast(`Marks for ${result.subject} cannot exceed ${result.max}`, 3000, 'error');
      } else if (result.error === 'no_credits') {
        showToast('No credits to calculate!', 3000, 'error');
      }
      return;
    }

    this.renderResult(result.sgpa);
  }

  renderResult(sgpa) {
    router.push(STEPS.RESULT, { sgpa });
    updateProgress(STEPS.RESULT);

    const state = appState.get();
    renderResultsComponent(
      this.mainContent,
      sgpa,
      state.branch,
      state.sem,
      this.getSubjects(),
      state.marks,
      () => router.back(),
      () => {
        router.clear();
        this.renderBranchSelection();
      },
      () => this.restart()
    );

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  solveForTarget() {
    const targetEl = document.getElementById('target-sgpa');
    const targetValue = targetEl.value;

    if (!targetValue || isNaN(parseFloat(targetValue))) {
      showToast('Please enter a target SGPA', 3000, 'error');
      return;
    }

    const target = parseFloat(targetValue);
    if (target < 0 || target > 10) {
      showToast('SGPA must be between 0 and 10', 3000, 'error');
      return;
    }

    const subjects = this.getSubjects();
    const result = calculator.solveForTarget(subjects, appState.get().marks, target);

    if (result.error) {
      if (result.error === 'all_filled') {
        showToast('All fields are already filled');
      } else if (result.error === 'impossible') {
        showToast(`Impossible! Max possible SGPA is ${result.maxPossible.toFixed(2)}`);
      }
      return;
    }

    result.marks.forEach(({ code, marks }) => {
      appState.updateMark(code, marks);
      const input = document.getElementById(`input-${code}`);
      if (input) {
        input.value = marks;
        input.classList.remove('empty-field');
        const parentRow = input.closest('.item-row');
        if (parentRow) {
          parentRow.style.opacity = '1';
          const asterisk = parentRow.querySelector('.item-label span');
          if (asterisk) asterisk.remove();
        }
      }
    });

    this.save();
    showToast('Marks predicted and filled!', 3000, 'success');
  }

  fillRandomMarks() {
    const inputs = document.querySelectorAll('.mark-input');
    inputs.forEach(input => {
      const max = parseFloat(input.dataset.max);
      const min = Math.floor(max * 0.4);
      const randomVal = Math.floor(Math.random() * (max - min + 1)) + min;
      input.value = randomVal;
      appState.updateMark(input.dataset.code, randomVal);
      input.classList.remove('empty-field');
      const parentRow = input.closest('.item-row');
      if (parentRow) {
        parentRow.style.opacity = '1';
        const asterisk = parentRow.querySelector('.item-label span');
        if (asterisk) asterisk.remove();
      }
    });
    this.save();
    showToast('Random marks filled!', 2000, 'success');
  }

  resetAllMarks() {
    const inputs = document.querySelectorAll('.mark-input');
    inputs.forEach(input => {
      input.value = '';
      appState.updateMark(input.dataset.code, '');
      input.classList.add('empty-field');
      const parentRow = input.closest('.item-row');
      if (parentRow) parentRow.style.opacity = '0.7';
    });
    this.save();
    showToast('All marks cleared!', 2000, 'normal');
  }

  goToBranch() {
    appState.reset();
    this.renderBranchSelection();
  }

  goToSemester() {
    appState.set('sem', null);
    appState.set('electiveSelections', {});
    appState.set('track', null);
    appState.clearMarks();
    this.renderSemesterSelection();
  }

  goToElective() {
    appState.set('electiveSelections', {});
    appState.set('track', null);
    appState.clearMarks();
    this.renderElectiveSelection();
  }

  goToMarks() {
    this.renderMarksInput();
  }

  goToResult(sgpa) {
    if (sgpa !== undefined) {
      this.renderResult(sgpa);
    } else {
      this.calculateSGPA();
    }
  }

  restart() {
    appState.reset();
    storage.clear();
    router.clear();
    this.renderBranchSelection();
  }
}

const app = new GradeCalcApp();
export default app;
