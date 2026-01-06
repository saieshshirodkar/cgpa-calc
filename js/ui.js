const mainContent = document.getElementById('main-content');
const toastBox = document.createElement('div');
toastBox.id = 'toast-box';
document.body.appendChild(toastBox);

function updateProgress(step) {
    const indicator = document.getElementById('progress-indicator');
    if (!indicator) return;

    const steps = {
        'branch': 'Step 1 of 4',
        'semester': 'Step 2 of 4',
        'elective': 'Step 3 of 4',
        'marks': 'Step 4 of 4',
        'result': 'Results'
    };

    indicator.textContent = steps[step] || '';
}

function loadState() {
    const saved = localStorage.getItem('gradeCalcState');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);

            if (parsed.branch && !DATA[parsed.branch]) {
                localStorage.removeItem('gradeCalcState');
                return false;
            }

            Object.assign(state, parsed);

            if (state.branch && state.sem) {
                 const semData = getSemData();
                 if (!semData) {
                     state.sem = null;
                     renderStep1();
                 } else if (isElectiveSelectionComplete()) {
                     renderStep3();
                 } else {
                     renderStep2();
                 }
            } else if (state.branch) {
                renderStep1();
            } else {
                renderBranchSelection();
            }
            return true;
        } catch (e) {
            console.error("State recovery failed:", e);
            localStorage.removeItem('gradeCalcState');
            return false;
        }
    }
    return false;
}

function getSemData() {
    if (!state.branch || !state.sem) return null;
    return DATA[state.branch]?.[state.sem] || null;
}

function restart() {
    state.branch = null;
    state.sem = null;
    state.electiveSelections = {};
    state.track = null;
    state.marks = {};
    localStorage.removeItem('gradeCalcState');
    renderBranchSelection();
}

function renderBranchSelection() {
    let html = `<div class="step"><p class="instruction">Select Branch</p><div class="sem-grid">`;
    for (const [code, name] of Object.entries(BRANCHES)) {
        const isDisabled = !DATA[code];
        html += `
            <button onclick="selectBranch('${code}')" class="${isDisabled ? 'disabled-soon' : ''}" ${isDisabled ? 'disabled' : ''}>
                <span>${name} (${code})</span>
                ${isDisabled ? '<small>Coming Soon</small>' : '<span>&rarr;</span>'}
            </button>
        `;
    }
    html += `</div></div>`;
    mainContent.innerHTML = html;
    updateProgress('branch');
}

function selectBranch(branch) {
    if (!DATA[branch]) {
        showToast("Data for this branch is coming soon!");
        return;
    }
    state.branch = branch;
    saveState();
    renderStep1();
}

function renderStep1() {
    const availableSems = Object.keys(DATA[state.branch] || {});

    let buttonsHtml = '';

    for(let i=1; i<=8; i++) {
        const isAvailable = availableSems.includes(i.toString());
        buttonsHtml += `
            <button onclick="selectSemester(${i})" class="${!isAvailable ? 'disabled-soon' : ''}" ${!isAvailable ? 'disabled' : ''}>
                <span>Semester ${i}</span>
                <span>${!isAvailable ? '<small>N/A</small>' : '&rarr;'}</span>
            </button>
        `;
    }

    mainContent.innerHTML = `
        <div class="step">
            <p class="instruction">Select Semester</p>
            <div class="sem-grid">
                ${buttonsHtml}
            </div>
            <button class="secondary" onclick="renderBranchSelection()">Back</button>
        </div>
    `;
    updateProgress('semester');
}

function selectSemester(sem) {
    const semData = DATA[state.branch]?.[sem];

    if (!semData) {
        showToast("Semester data not available");
        return;
    }
    state.sem = sem;
    state.electiveSelections = {};
    state.track = null;
    saveState();
    renderStep2();
}

function renderStep2() {
    const semData = DATA[state.branch][state.sem];

    if (!semData.electives || Object.keys(semData.electives).length === 0) {
        renderStep3();
        return;
    }

    if (semData.electiveMode === 'track') {
        renderTrackSelection(semData);
    } else if (semData.electiveMode === 'slot') {
        renderSlotSelection(semData);
    }
}

function renderTrackSelection(semData) {
    const tracks = Object.keys(semData.electives);
    let html = `<div class="step"><p class="instruction">Select Elective Track</p>`;

    tracks.forEach(track => {
        html += `
            <button onclick="selectTrack('${track}')">
                <span>${track}</span>
                <span>&rarr;</span>
            </button>
        `;
    });
    html += `<button class="secondary" onclick="renderStep1()">Back</button></div>`;
    mainContent.innerHTML = html;
    updateProgress('elective');
}

function selectTrack(track) {
    state.track = track;
    saveState();
    renderStep3();
}

function renderSlotSelection(semData) {
    const slots = Object.keys(semData.electives);
    let html = `<div class="step"><p class="instruction">Select Electives</p>`;

    slots.forEach(slot => {
        const options = semData.electives[slot];
        const currentVal = state.electiveSelections[slot] || "";

        html += `
            <div style="margin-bottom: 1.5rem;">
                <label class="item-label">${slot}</label>
                <select onchange="updateSlotSelection('${slot}', this.value)">
                    <option value="" disabled ${currentVal===""?'selected':''}>Select Subject...</option>
                    ${options.map(opt => `<option value="${opt.code}" ${currentVal===opt.code?'selected':''}>${opt.code} - ${opt.name}</option>`).join('')}
                </select>
            </div>
        `;
    });

    html += `
        <button class="primary" onclick="confirmSlotSelections()">Next &rarr;</button>
        <button class="secondary" onclick="renderStep1()">Back</button>
    </div>`;
    mainContent.innerHTML = html;
    updateProgress('elective');
}

function updateSlotSelection(slot, code) {
    state.electiveSelections[slot] = code;
    saveState();
}

function confirmSlotSelections() {
    const semData = DATA[state.branch][state.sem];
    const slots = Object.keys(semData.electives);

    for (const slot of slots) {
        if (!state.electiveSelections[slot]) {
            showToast(`Please select a subject for ${slot}`);
            return;
        }
    }
    renderStep3();
}

function goBackFromStep3() {
    const semData = DATA[state.branch][state.sem];

    if (semData.electives && Object.keys(semData.electives).length > 0) {
        if (semData.electiveMode === 'track') {
            renderTrackSelection(semData);
        } else if (semData.electiveMode === 'slot') {
            renderSlotSelection(semData);
        }
    } else {
        renderStep1();
    }
}

function isElectiveSelectionComplete() {
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

function renderStep3() {
    const semData = DATA[state.branch][state.sem];

    let subjects = [...semData.common];

    if (semData.electiveMode === 'track' && state.track) {
        subjects = [...subjects, ...semData.electives[state.track]];
    } else if (semData.electiveMode === 'slot') {
        Object.keys(semData.electives).forEach(slot => {
            const code = state.electiveSelections[slot];
            const sub = semData.electives[slot].find(s => s.code === code);
            if (sub) subjects.push(sub);
        });
    }

    let html = `
        <div class="step" id="marks-step">
            <p class="instruction" style="display: flex; justify-content: space-between; align-items: center;">
                <span>Enter Marks Obtained</span>
                <span class="rainbow-text" onclick="fillRandomMarks()">Random Fill</span>
            </p>

            <div style="margin-bottom: 1.5rem; padding: 1.25rem; border: 1px solid #222; border-radius: 8px; background: linear-gradient(135deg, #0a0a0a 0%, #050505 100%);">
                <p style="font-size: 0.7rem; color: #888; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.75rem;">
                    Target SGPA Predictor
                </p>
                <div class="flex-row">
                    <div class="fancy-input" style="flex:1; position: relative;">
                        <input type="number" id="target-sgpa" placeholder="Target SGPA (e.g., 8.5)" step="0.01" min="0" max="10" />
                    </div>
                    <button class="primary" onclick="solveForTarget()" style="margin-top: 0; width: auto; white-space: nowrap; padding-left: 1.5rem; padding-right: 1.5rem;">Predict</button>
                </div>
            </div>

            <div id="items-list">
    `;

    subjects.forEach((sub) => {
        const maxMarks = sub.max !== undefined ? sub.max : (sub.credits * 25);

        if (sub.credits === 0 || maxMarks === 0) return;

        const val = state.marks[sub.code] !== undefined ? state.marks[sub.code] : '';
        const isEmpty = val === '';

        html += `
            <div class="item-row" style="${isEmpty ? 'opacity: 0.7;' : ''}">
                <span class="item-label" style="display: flex; justify-content: space-between;">
                    ${sub.code}
                    ${isEmpty ? '<span style="color: #ef4444;">*</span>' : ''}
                </span>
                <p style="font-size: 0.9rem; margin-bottom: 0.5rem;">${sub.name}</p>
                <div class="flex-row">
                    <div class="fancy-input" style="flex:1; position: relative;">
                       <input type="number"
                               id="input-${sub.code}"
                               class="mark-input ${isEmpty ? 'empty-field' : ''}"
                               data-code="${sub.code}"
                               data-max="${maxMarks}"
                               placeholder="Obtained Marks"
                               min="0" max="${maxMarks}"
                               step="0.5"
                               inputmode="decimal"
                               value="${val}" />
                       <span style="position: absolute; right: 10px; top: 12px; color: #666; font-size: 0.85rem; font-weight: 500; z-index: 2;">
                           / ${maxMarks}
                       </span>
                    </div>
                </div>
            </div>
        `;
    });

    html += `
            </div>

            <button class="primary" onclick="calculateSGPA()">Calculate SGPA</button>
            <button class="secondary" onclick="goBackFromStep3()">Back</button>
        </div>`;

    mainContent.innerHTML = html;
    updateProgress('marks');

    setTimeout(() => {
        const firstInput = document.querySelector('input[type=number]');
        if(firstInput && (!state.marks || Object.keys(state.marks).length === 0)) firstInput.focus();
    }, 200);
}

function fillRandomMarks() {
    const inputs = document.querySelectorAll('.mark-input');
    inputs.forEach(input => {
        const max = parseFloat(input.dataset.max);
        const min = Math.floor(max * 0.4);
        const randomVal = Math.floor(Math.random() * (max - min + 1)) + min;
        input.value = randomVal;
        state.marks[input.dataset.code] = randomVal;
    });
    saveState();
    showToast("Random marks filled!", 2000, 'success');
}

function renderResult(sgpa) {
    let message = "Keep it up!";
    if(sgpa > 9) message = "Outstanding!";
    else if(sgpa > 8) message = "Excellent Work!";
    else if(sgpa < 5) message = "You can do better!";

    const semData = DATA[state.branch][state.sem];

    let subjects = [...semData.common];

    if (semData.electiveMode === 'track' && state.track) {
        subjects = [...subjects, ...semData.electives[state.track]];
    } else if (semData.electiveMode === 'slot') {
         Object.keys(semData.electives).forEach(slot => {
            const code = state.electiveSelections[slot];
            const sub = semData.electives[slot].find(s => s.code === code);
            if (sub) subjects.push(sub);
        });
    }

    let breakdownHtml = `<div style="margin: 1.5rem 0; text-align: left; border-top: 1px solid #333; border-bottom: 1px solid #333;">`;
    breakdownHtml += `<div style="display: flex; padding: 0.5rem 0; color: #666; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em;">
        <div style="flex: 3; text-align: left;">Subject</div>
        <div style="flex: 1; text-align: center;">Marks</div>
        <div style="flex: 1; text-align: right;">Crds</div>
        <div style="flex: 1; text-align: right;">Grd</div>
    </div>`;
    breakdownHtml += `<style>
        .grade-row:hover {
            background: rgba(255, 255, 255, 0.03);
        }
    </style>`;

    subjects.forEach(sub => {
        if (sub.credits === 0) return;

        const marks = state.marks[sub.code];
        const maxMarks = sub.max !== undefined ? sub.max : (sub.credits * 25);
        const percentage = (marks / maxMarks) * 100;
        const letter = getGradeLetter(percentage);
        const gradePoint = getGradePoint(percentage);

        const gradeColors = {
            10: '#4ade80',
            9: '#22d3ee',
            8: '#60a5fa',
            7: '#a78bfa',
            6: '#f472b6',
            5: '#fb923c',
            0: '#ef4444'
        };

        const gradeColor = gradeColors[gradePoint] || '#fff';

        breakdownHtml += `<div class="grade-row" style="display: flex; padding: 0.75rem 0; border-top: 1px solid #1a1a1a; font-size: 0.85rem; transition: background 0.2s;">
            <div style="flex: 3; color: #fff; font-family: monospace;">${sub.short || sub.code}</div>
            <div style="flex: 1; text-align: center; color: #ccc;">${marks}</div>
            <div style="flex: 1; text-align: right; color: #666;">${sub.credits}</div>
            <div style="flex: 1; text-align: right; font-weight: 600; color: ${gradeColor};">${letter}</div>
        </div>`;
    });
    breakdownHtml += `</div>`;

    mainContent.innerHTML = `
        <div class="step" id="result-step" style="text-align: center; padding: 1rem 0;">
            <div id="score-card" style="padding: 2rem; background: linear-gradient(135deg, #0a0a0a 0%, #050505 100%); border: 1px solid #1a1a1a; border-radius: 8px; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);">
                <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom: 0.5rem;">
                    <div style="text-align:left;">
                        <span style="display:block; font-size: 0.8rem; color: #666; text-transform: uppercase;">Semester ${state.sem}</span>
                        <span style="display:block; font-size: 0.6rem; color: #444;">${state.branch}</span>
                    </div>
                    <div style="text-align:right;">
                        <span style="font-size: 3rem; font-weight: 700; color: #fff; line-height: 1; animation: scorePop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);">${sgpa.toFixed(2)}</span>
                    </div>
                </div>

                ${breakdownHtml}

                <div style="text-align: center; margin-top: 1.5rem;">
                    <p style="color: #666; font-size: 0.8rem; font-style: italic;">"${message}"</p>
                </div>
            </div>

            <div style="margin-top: 2rem; display: flex; flex-direction: column; gap: 1rem;">
                <button class="primary" onclick="shareScorecard()">Save as Image</button>
                <div style="display: flex; gap: 1rem;">
                    <button class="secondary" style="flex: 1;" onclick="renderStep3()">Edit Marks</button>
                    <button class="secondary" style="flex: 1;" onclick="restart()">Start Over</button>
                </div>
            </div>
        </div>
    `;
    mainContent.innerHTML = html;
    updateProgress('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function shareScorecard() {
    const element = document.getElementById('score-card');
    showToast("Generating image...", 10000, 'normal');

    if (!window.html2canvas && !navigator.onLine) {
        showToast("Internet required for first download", 4000, 'error');
        return;
    }

    if (window.html2canvas) {
        generateImage(element);
    } else {
        const script = document.createElement('script');
        script.src = "https://html2canvas.hertzen.com/dist/html2canvas.min.js";
        script.onload = () => generateImage(element);
        script.onerror = () => showToast("Failed to load image generator. Check connection.", 4000, 'error');
        document.head.appendChild(script);
    }
}

function generateImage(element) {
    html2canvas(element, {
        backgroundColor: "#000000",
        scale: 2
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `SGPA_${state.branch}_Sem${state.sem}.png`;
        link.href = canvas.toDataURL();
        link.click();
        showToast("Image saved!", 2000, 'success');
    }).catch(err => {
        showToast("Failed to save image", 3000, 'error');
    });
}
