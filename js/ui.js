const mainContent = document.getElementById('main-content');
const toastBox = document.createElement('div');
toastBox.id = 'toast-box';
document.body.appendChild(toastBox);

function loadState() {
    const saved = localStorage.getItem('gradeCalcState');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            Object.assign(state, parsed);
            
            if (state.sem) {
                if (state.electiveGroup || (SEMESTER_DATA[state.sem] && !SEMESTER_DATA[state.sem].electives)) {
                    renderStep3();
                } else {
                    renderStep2();
                }
            } else {
                return false;
            }
            return true;
        } catch (e) {
            return false;
        }
    }
    return false;
}

function restart() {
    state.sem = null;
    state.electiveGroup = null;
    state.marks = {};
    localStorage.removeItem('gradeCalcState');
    renderStep1();
}

function renderStep1() {
    let buttonsHtml = '';
    for(let i=1; i<=8; i++) {
        const isComingSoon = i > 4;
        buttonsHtml += `
            <button onclick="selectSemester(${i})" class="${isComingSoon ? 'disabled-soon' : ''}">
                <span>Semester ${i}</span>
                <span>${isComingSoon ? '<small style="font-size:0.7em; opacity:0.6;">SOON</small>' : '&rarr;'}</span>
            </button>
        `;
    }

    mainContent.innerHTML = `
        <div class="step">
            <p class="instruction">Select Semester</p>
            <div class="sem-grid">
                ${buttonsHtml}
            </div>
        </div>
    `;
}

function selectSemester(sem) {
    if (sem > 4) {
        showToast(`Semester ${sem} is coming soon!`);
        return;
    }
    state.sem = sem;
    saveState();
    renderStep2();
}

function renderStep2() {
    const semData = SEMESTER_DATA[state.sem];
    if (!semData.electives || Object.keys(semData.electives).length === 0) {
        state.electiveGroup = null;
        saveState();
        renderStep3();
        return;
    }

    const groupNames = Object.keys(semData.electives);
    let html = `<div class="step"><p class="instruction">Select Elective</p>`;
    
    groupNames.forEach(group => {
        html += `
            <button onclick="selectElective('${group}')">
                <span>${group}</span>
                <span>&rarr;</span>
            </button>
        `;
    });

    html += `<button class="secondary" onclick="renderStep1()">Go Back</button></div>`;
    mainContent.innerHTML = html;
}

function selectElective(group) {
    state.electiveGroup = group;
    saveState();
    renderStep3();
}

function renderStep3() {
    const semData = SEMESTER_DATA[state.sem];
    let subjects = [...semData.common];
    
    if (state.electiveGroup && semData.electives[state.electiveGroup]) {
        subjects = [...subjects, ...semData.electives[state.electiveGroup]];
    }
    
    let html = `
        <div class="step" id="marks-step">
            <p class="instruction">Enter Marks Obtained</p>
            <div id="items-list">
    `;
    
    subjects.forEach((sub) => {
        const maxMarks = sub.credits * 25;
        const val = state.marks[sub.code] !== undefined ? state.marks[sub.code] : '';
        
        html += `
            <div class="item-row">
                <span class="item-label">${sub.code}</span>
                <p style="font-size: 0.9rem; margin-bottom: 0.5rem;">${sub.name}</p>
                <div class="flex-row">
                    <div style="flex:1; position: relative;">
                        <input type="number" 
                               id="input-${sub.code}"
                               placeholder="Obtained Marks" 
                               min="0" max="${maxMarks}"
                               step="0.5"
                               inputmode="decimal"
                               onchange="updateMarks('${sub.code}', this.value)" 
                               onblur="validateInput('${sub.code}', ${maxMarks})"
                               value="${val}" />
                        <span style="position: absolute; right: 10px; top: 12px; color: #666; font-size: 0.8rem;">
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
            <button class="secondary" onclick="renderStep2()">Back</button>
        </div>`;
    
    mainContent.innerHTML = html;
    
    setTimeout(() => {
        const firstInput = document.querySelector('input[type=number]');
        if(firstInput && (!state.marks || Object.keys(state.marks).length === 0)) firstInput.focus();
    }, 200);
}

function renderResult(sgpa) {
    let message = "Keep it up!";
    if(sgpa > 9) message = "Outstanding!";
    else if(sgpa > 8) message = "Excellent Work!";
    else if(sgpa < 5) message = "You can do better!";

    const semData = SEMESTER_DATA[state.sem];
    let subjects = [...semData.common];
    if (state.electiveGroup && semData.electives[state.electiveGroup]) {
        subjects = [...subjects, ...semData.electives[state.electiveGroup]];
    }

    let breakdownHtml = `<div style="margin: 1.5rem 0; text-align: left; border-top: 1px solid #333; border-bottom: 1px solid #333;">`;
    breakdownHtml += `<div style="display: flex; padding: 0.5rem 0; color: #666; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em;">
        <div style="flex: 3; text-align: left;">Subject</div>
        <div style="flex: 1; text-align: center;">Marks</div>
        <div style="flex: 1; text-align: right;">Crds</div>
        <div style="flex: 1; text-align: right;">Grd</div>
    </div>`;

    subjects.forEach(sub => {
        const marks = state.marks[sub.code];
        const maxMarks = sub.credits * 25;
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
    
    html2canvas(element, {
        backgroundColor: "#000000",
        scale: 2
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `SGPA_Sem${state.sem}_${new Date().toISOString().slice(0,10)}.png`;
        link.href = canvas.toDataURL();
        link.click();
        showToast("Image downloaded!");
    }).catch(err => {
        showToast("Failed to generate image");
    });
}
