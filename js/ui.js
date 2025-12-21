const mainContent = document.getElementById('main-content');
const toastBox = document.createElement('div');
toastBox.id = 'toast-box';
document.body.appendChild(toastBox);

function loadState() {
    const saved = localStorage.getItem('gradeCalcState');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            
            // Data integrity check: Ensure saved scheme and branch actually exist in current DATA
            if (parsed.scheme && !DATA[parsed.scheme]) {
                localStorage.removeItem('gradeCalcState');
                return false;
            }
            
            if (parsed.scheme && parsed.branch && parsed.branch !== 'COMMON' && !DATA[parsed.scheme][parsed.branch]) {
                parsed.branch = null;
                parsed.sem = null;
            }

            Object.assign(state, parsed);
            
            if (state.scheme && state.branch && state.sem) {
                 const semData = getSemData();
                 if (!semData) {
                     state.sem = null;
                     renderStep1();
                 } else if (isElectiveSelectionComplete()) {
                     renderStep3();
                 } else {
                     renderStep2();
                 }
            } else if (state.scheme && state.branch) {
                renderStep1();
            } else if (state.scheme) {
                renderBranchSelection();
            } else {
                renderSchemeSelection();
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
    if (!state.scheme || !state.sem) return null;
    if (state.scheme === 'RC2019-20' && DATA[state.scheme]['COMMON']?.[state.sem]) {
        return DATA[state.scheme]['COMMON'][state.sem];
    }
    return DATA[state.scheme]?.[state.branch]?.[state.sem] || null;
}



function restart() {
    state.scheme = null;
    state.branch = null;
    state.sem = null;
    state.electiveSelections = {};
    state.track = null;
    state.marks = {};
    localStorage.removeItem('gradeCalcState');
    renderSchemeSelection();
}

function renderSchemeSelection() {
    mainContent.innerHTML = `
        <div class="step">
            <p class="instruction">Select Course Scheme</p>
            <button onclick="selectScheme('RC2024-25')" class="primary-btn">
                <span>RC 2024-25 (NEP)</span> <span>&rarr;</span>
            </button>
            <button onclick="selectScheme('RC2019-20')" class="primary-btn">
                <span>RC 2019-20 </span> <span>&rarr;</span>
            </button>
        </div>
    `;
}

function selectScheme(scheme) {
    state.scheme = scheme;
    saveState();
    renderBranchSelection();
}

function renderBranchSelection() {
    let html = `<div class="step"><p class="instruction">Select Branch</p><div class="sem-grid">`;
    for (const [code, name] of Object.entries(BRANCHES)) {
        // Disable branches that don't have data yet
        const isDisabled = !DATA[state.scheme][code]; 
        html += `
            <button onclick="selectBranch('${code}')" class="${isDisabled ? 'disabled-soon' : ''}" ${isDisabled ? 'disabled' : ''}>
                <span>${name} (${code})</span>
                ${isDisabled ? '<small>Coming Soon</small>' : '<span>&rarr;</span>'}
            </button>
        `;
    }
    html += `</div><button class="secondary" onclick="restart()">Back</button></div>`;
    mainContent.innerHTML = html;
}

function selectBranch(branch) {
    if (!DATA[state.scheme][branch]) {
        showToast("Data for this branch is coming soon!");
        return;
    }
    state.branch = branch;
    saveState();
    renderStep1(); // Select Semester
}

function renderStep1() {
    // Select Semester
    let availableSems = [];
    
    // Logic for RC2019-20 Common Semesters
    if (state.scheme === 'RC2019-20') {
        if (DATA[state.scheme]['COMMON']) {
            availableSems = [...availableSems, ...Object.keys(DATA[state.scheme]['COMMON'])];
        }
    }
    
    // Branch specific semesters
    if (DATA[state.scheme][state.branch]) {
        availableSems = [...availableSems, ...Object.keys(DATA[state.scheme][state.branch])];
    }
    
    // Remove duplicates and sort
    availableSems = [...new Set(availableSems)].sort();

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
}

function selectSemester(sem) {
    let semData = null;

    // Check Common first (Priority to Common for RC19-20 Sem 1/2)
    if (state.scheme === 'RC2019-20' && DATA[state.scheme]['COMMON']?.[sem]) {
        semData = DATA[state.scheme]['COMMON'][sem];
    } else if (DATA[state.scheme][state.branch][sem]) {
        semData = DATA[state.scheme][state.branch][sem];
    }

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
    // Select Elective(s)
    let semData;
    // Resolve Correct Data Source again
    if (state.scheme === 'RC2019-20' && DATA[state.scheme]['COMMON'][state.sem]) {
        semData = DATA[state.scheme]['COMMON'][state.sem];
    } else {
        semData = DATA[state.scheme][state.branch][state.sem];
    }
    
    // Check mode
    if (!semData.electives || Object.keys(semData.electives).length === 0) {
        // No electives, skip to marks
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
}

function selectTrack(track) {
    state.track = track;
    saveState();
    renderStep3();
}

function renderSlotSelection(semData) {
    // Render dropdowns for each slot
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
}

function updateSlotSelection(slot, code) {
    state.electiveSelections[slot] = code;
    saveState();
}

function confirmSlotSelections() {
    let semData;
    if (state.scheme === 'RC2019-20' && DATA[state.scheme]['COMMON'][state.sem]) {
        semData = DATA[state.scheme]['COMMON'][state.sem];
    } else {
        semData = DATA[state.scheme][state.branch][state.sem];
    }
    const slots = Object.keys(semData.electives);
    
    // Validate all slots filled
    for (const slot of slots) {
        if (!state.electiveSelections[slot]) {
            showToast(`Please select a subject for ${slot}`);
            return;
        }
    }
    renderStep3();
}

function goBackFromStep3() {
    let semData;
    if (state.scheme === 'RC2019-20' && DATA[state.scheme]['COMMON'][state.sem]) {
        semData = DATA[state.scheme]['COMMON'][state.sem];
    } else {
        semData = DATA[state.scheme][state.branch][state.sem];
    }
    
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
    let semData;
    if (state.scheme === 'RC2019-20' && DATA[state.scheme]['COMMON'][state.sem]) {
        semData = DATA[state.scheme]['COMMON'][state.sem];
    } else {
        semData = DATA[state.scheme][state.branch][state.sem];
    }
    
    if (!semData.electives || Object.keys(semData.electives).length === 0) return true;
    
    if (semData.electiveMode === 'track') return !!state.track;
    if (semData.electiveMode === 'slot') {
        const slots = Object.keys(semData.electives);
        return slots.every(s => !!state.electiveSelections[s]);
    }
    return false;
}

function renderStep3() {
    let semData;
    if (state.scheme === 'RC2019-20' && DATA[state.scheme]['COMMON'][state.sem]) {
        semData = DATA[state.scheme]['COMMON'][state.sem];
    } else {
        semData = DATA[state.scheme][state.branch][state.sem];
    }

    let subjects = [...semData.common];
    
    if (semData.electiveMode === 'track' && state.track) {
        subjects = [...subjects, ...semData.electives[state.track]];
    } else if (semData.electiveMode === 'slot') {
        // Lookup selected codes
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
                <span class="rainbow-text" onclick="fillRandomMarks()">Random</span>
            </p>
            <div id="items-list">
    `;
    
    subjects.forEach((sub) => {
        // Use explicit max marks if defined (RC19-20), otherwise calculate (RC24-25)
        const maxMarks = sub.max !== undefined ? sub.max : (sub.credits * 25);
        
        // Skip subjects with 0 credits/marks (Audits)
        if (sub.credits === 0 || maxMarks === 0) return;

        const val = state.marks[sub.code] !== undefined ? state.marks[sub.code] : '';
        
        html += `
            <div class="item-row">
                <span class="item-label">${sub.code}</span>
                <p style="font-size: 0.9rem; margin-bottom: 0.5rem;">${sub.name}</p>
                <div class="flex-row">
                    <div class="fancy-input" style="flex:1; position: relative;">
                       <input type="number" 
                               id="input-${sub.code}"
                               class="mark-input"
                               data-code="${sub.code}"
                               data-max="${maxMarks}"
                               placeholder="Obtained Marks" 
                               min="0" max="${maxMarks}"
                               step="0.5"
                               inputmode="decimal"
                               value="${val}" />
                        <span style="position: absolute; right: 10px; top: 12px; color: #666; font-size: 0.8rem; z-index: 2;">
                            / ${maxMarks}
                        </span>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += `
            </div>
            
            <div style="margin: 2rem 0; padding: 1.5rem; border: 1px solid #222; border-radius: 8px; background: #050505;">
                <p style="font-size: 0.7rem; color: #666; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1rem;">Target SGPA Predictor</p>
                <div class="flex-row">
                    <div class="fancy-input" style="flex:1; position: relative;">
                        <input type="number" id="target-sgpa" placeholder="Target SGPA" step="0.01" min="0" max="10" />
                    </div>
                    <button class="primary" onclick="solveForTarget()" style="margin-top: 0; width: auto; white-space: nowrap; padding-left: 1.5rem; padding-right: 1.5rem;">Predict</button>
                </div>
                <p style="font-size: 0.65rem; color: #444; margin-top: 0.8rem;">Fills empty fields with minimum marks required.</p>
            </div>

            <button class="primary" onclick="calculateSGPA()">Calculate SGPA</button>
            <button class="secondary" onclick="goBackFromStep3()">Back</button>
        </div>`;
    
    mainContent.innerHTML = html;
    
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
    showToast("Random marks filled!");
}

function renderResult(sgpa) {
    let message = "Keep it up!";
    if(sgpa > 9) message = "Outstanding!";
    else if(sgpa > 8) message = "Excellent Work!";
    else if(sgpa < 5) message = "You can do better!";

    let semData;
    if (state.scheme === 'RC2019-20' && DATA[state.scheme]['COMMON'][state.sem]) {
        semData = DATA[state.scheme]['COMMON'][state.sem];
    } else {
        semData = DATA[state.scheme][state.branch][state.sem];
    }
    
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

    subjects.forEach(sub => {
        if (sub.credits === 0) return; // Skip audit courses in calculation/display
        
        const marks = state.marks[sub.code];
        const maxMarks = sub.max !== undefined ? sub.max : (sub.credits * 25);
        const percentage = (marks / maxMarks) * 100;
        const letter = getGradeLetter(percentage);
        
        breakdownHtml += `<div style="display: flex; padding: 0.75rem 0; border-top: 1px solid #1a1a1a; font-size: 0.85rem;">
            <div style="flex: 3; color: #fff; font-family: monospace;">${sub.short || sub.code}</div>
            <div style="flex: 1; text-align: center; color: #ccc;">${marks}</div>
            <div style="flex: 1; text-align: right; color: #666;">${sub.credits}</div>
            <div style="flex: 1; text-align: right; font-weight: 600; color: #fff;">${letter}</div>
        </div>`;
    });
    breakdownHtml += `</div>`;

    mainContent.innerHTML = `
        <div class="step" id="result-step" style="text-align: center; padding: 1rem 0;">
            <div id="score-card" style="padding: 2rem; background: #000; border: 1px solid #1a1a1a; border-radius: 8px;">
                <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom: 0.5rem;">
                    <div style="text-align:left;">
                        <span style="display:block; font-size: 0.8rem; color: #666; text-transform: uppercase;">Semester ${state.sem}</span>
                        <span style="display:block; font-size: 0.6rem; color: #444;">${state.branch} - ${state.scheme}</span>
                    </div>
                    <div style="text-align:right;">
                        <span style="font-size: 3rem; font-weight: 700; color: #fff; line-height: 1;">${sgpa.toFixed(2)}</span>
                    </div>
                </div>

                ${breakdownHtml}

                <div style="text-align: center; margin-top: 1.5rem;">
                    <p style="color: #666; font-size: 0.8rem; font-style: italic;">"${message}"</p>
                </div>
            </div>
            
            <div style="margin-top: 2rem; display: flex; flex-direction: column; gap: 1rem;">
                <button class="primary" onclick="shareScorecard()">Download Scorecard</button>
                <div style="display: flex; gap: 1rem;">
                    <button class="secondary" style="flex: 1;" onclick="renderStep3()">Edit Marks</button>
                    <button class="secondary" style="flex: 1;" onclick="restart()">New Calc</button>
                </div>
            </div>
        </div>
    `;
}

function shareScorecard() {
    const element = document.getElementById('score-card');
    showToast("Generating image...");
    
    // Check if network is available if script isn't loaded
    if (!window.html2canvas && !navigator.onLine) {
        showToast("Internet connection required for first-time download");
        return;
    }

    if (window.html2canvas) {
        generateImage(element);
    } else {
        const script = document.createElement('script');
        script.src = "https://html2canvas.hertzen.com/dist/html2canvas.min.js";
        script.onload = () => generateImage(element);
        script.onerror = () => showToast("Failed to load image generator. Check connection.");
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
        showToast("Image downloaded!");
    }).catch(err => {
        showToast("Failed to generate image");
    });
}
