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
    if (!this.mainContent) {
      console.error('Fatal error: main-content element not found in DOM');
      throw new Error('Application initialization failed: main-content element not found');
    }
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
    try {
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
    } catch (error) {
      console.error('Error loading saved state:', error);
      storage.clear();
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

    const h1Element = document.querySelector('h1');
    if (h1Element) {
      h1Element.addEventListener('click', () => this.restart());
    }
  }

  getSemData() {
    const state = appState.get();
    if (!state.branch || !state.sem) return null;
    return DATA[state.branch]?.[state.sem] || null;
  }

  isElectiveSelectionComplete() {
    const state = appState.get();
    if (!state.sem || !state.branch) return false;
    const semData = DATA[state.branch]?.[state.sem];
    
    if (!semData) return false;

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

    let subjects = [];
    if (Array.isArray(semData.common)) {
      subjects = [...semData.common];
    }
    
    const state = appState.get();

    if (semData.electiveMode === 'track' && state.track && semData.electives?.[state.track]) {
      const electiveSubjects = semData.electives[state.track];
      if (Array.isArray(electiveSubjects)) {
        subjects = [...subjects, ...electiveSubjects];
      }
    } else if (semData.electiveMode === 'slot' && semData.electives) {
      Object.keys(semData.electives).forEach(slot => {
        const code = state.electiveSelections?.[slot];
        if (code && Array.isArray(semData.electives[slot])) {
          const sub = semData.electives[slot].find(s => s?.code === code);
          if (sub) subjects.push(sub);
        }
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
    
    if (!semData) {
      console.error('No semester data available');
      showToast('Error: Semester data not available', 3000, 'error');
      this.renderSemesterSelection();
      return;
    }
    
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

    const predictBtn = document.querySelector('.predict-btn');
    if (predictBtn) {
      predictBtn.addEventListener('click', () => this.solveForTarget());
    }
  }

  calculateSGPA() {
    try {
      const subjects = this.getSubjects();
      if (!subjects || subjects.length === 0) {
        showToast('No subjects available for calculation', 3000, 'error');
        return;
      }
      
      const marks = appState.get().marks;
      if (!marks || Object.keys(marks).length === 0) {
        showToast('Please enter marks for at least one subject', 3000, 'error');
        return;
      }
      
      const result = calculator.calculateSGPA(subjects, marks);

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
        } else if (result.error === 'invalid_subjects' || result.error === 'invalid_marks') {
          showToast('Invalid data for calculation', 3000, 'error');
        }
        return;
      }

      if (typeof result.sgpa !== 'number' || isNaN(result.sgpa)) {
        showToast('Error calculating SGPA', 3000, 'error');
        return;
      }

      this.renderResult(result.sgpa);
    } catch (error) {
      console.error('Error in calculateSGPA:', error);
      showToast('An error occurred while calculating SGPA', 3000, 'error');
    }
  }

  renderResult(sgpa) {
    if (typeof sgpa !== 'number' || isNaN(sgpa)) {
      console.error('Invalid SGPA value:', sgpa);
      showToast('Error: Invalid SGPA result', 3000, 'error');
      return;
    }
    
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
    try {
      const targetEl = document.getElementById('target-sgpa');
      if (!targetEl) {
        console.error('Target SGPA input element not found');
        showToast('Error: Input element not found', 3000, 'error');
        return;
      }
      
      const targetValue = targetEl.value;

      if (!targetValue || targetValue.trim() === '' || isNaN(parseFloat(targetValue))) {
        showToast('Please enter a valid target SGPA', 3000, 'error');
        return;
      }

      const target = parseFloat(targetValue);
      if (target < 0 || target > 10) {
        showToast('SGPA must be between 0 and 10', 3000, 'error');
        return;
      }

      const subjects = this.getSubjects();
      if (!subjects || subjects.length === 0) {
        showToast('No subjects available', 3000, 'error');
        return;
      }
      
      const result = calculator.solveForTarget(subjects, appState.get().marks, target);

      if (result.error) {
        if (result.error === 'all_filled') {
          showToast('All fields are already filled');
        } else if (result.error === 'impossible') {
          showToast(`Impossible! Max possible SGPA is ${result.maxPossible?.toFixed(2) || 'N/A'}`);
        }
        return;
      }

      if (!result.marks || !Array.isArray(result.marks)) {
        console.error('Invalid result from solveForTarget:', result);
        showToast('Error calculating marks', 3000, 'error');
        return;
      }

      result.marks.forEach(({ code, marks }) => {
        if (!code) return;
        
        appState.updateMark(code, marks);
        const input = document.getElementById(`input-${code}`);
        if (input) {
          input.value = marks;
          input.classList.remove('empty-field');
          const parentRow = input.closest('.item-row');
          if (parentRow) {
            parentRow.style.opacity = '1';
            const itemLabel = parentRow.querySelector('.item-label');
            if (itemLabel) {
              const asterisk = itemLabel.querySelector('span:last-child');
              if (asterisk) asterisk.remove();
            }
          }
        }
      });

      this.save();
      showToast('Marks predicted and filled!', 3000, 'success');
    } catch (error) {
      console.error('Error in solveForTarget:', error);
      showToast('An error occurred while predicting marks', 3000, 'error');
    }
  }

  fillRandomMarks() {
    try {
      const inputs = document.querySelectorAll('.mark-input');
      if (inputs.length === 0) {
        showToast('No input fields found', 3000, 'error');
        return;
      }
      
      inputs.forEach(input => {
        const max = parseFloat(input.dataset.max);
        if (isNaN(max) || max <= 0) return;
        
        const min = Math.floor(max * 0.4);
        const randomVal = Math.floor(Math.random() * (max - min + 1)) + min;
        const code = input.dataset.code;
        
        if (!code) return;
        
        input.value = randomVal;
        appState.updateMark(code, randomVal);
        input.classList.remove('empty-field');
        const parentRow = input.closest('.item-row');
        if (parentRow) {
          parentRow.style.opacity = '1';
          const itemLabel = parentRow.querySelector('.item-label');
          if (itemLabel) {
            const asterisk = itemLabel.querySelector('span:last-child');
            if (asterisk) asterisk.remove();
          }
        }
      });
      this.save();
      showToast('Random marks filled!', 2000, 'success');
    } catch (error) {
      console.error('Error in fillRandomMarks:', error);
      showToast('Error filling random marks', 3000, 'error');
    }
  }

  resetAllMarks() {
    try {
      const inputs = document.querySelectorAll('.mark-input');
      if (inputs.length === 0) {
        showToast('No input fields found', 3000, 'error');
        return;
      }
      
      inputs.forEach(input => {
        const code = input.dataset.code;
        if (!code) return;
        
        input.value = '';
        appState.updateMark(code, '');
        input.classList.add('empty-field');
        const parentRow = input.closest('.item-row');
        if (parentRow) parentRow.style.opacity = '0.7';
      });
      this.save();
      showToast('All marks cleared!', 2000, 'normal');
    } catch (error) {
      console.error('Error in resetAllMarks:', error);
      showToast('Error clearing marks', 3000, 'error');
    }
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
