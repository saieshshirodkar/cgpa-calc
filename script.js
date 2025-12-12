const state = {
    sem: null,
    electiveGroup: null,
    marks: {} 
};

const SEMESTER_DATA = {
    1: {
        common: [
            { code: 'EEL-100', name: 'Fund. of Electrical & Electronics', credits: 3 },
            { code: 'EEL-101', name: 'Fund. of Electrical & Electronics Lab', credits: 1 },
            { code: 'SHM-132', name: 'Applied Physics', credits: 2 },
            { code: 'SHM-133', name: 'Applied Physics Lab', credits: 1 },
            { code: 'AEC-153', name: 'Comm. & Technical Writing', credits: 3 },
            { code: 'VAC-158', name: 'Env. Science & Sustainability', credits: 2 },
            { code: 'VAC-159', name: 'Env. Science & Sustainability Lab', credits: 1 },
            { code: 'SEC-143', name: 'Engg. Graphics & Design with UI/UX', credits: 3 }
        ],
        electives: { 
            'Computing': [
                { code: 'ITH-111', name: 'Basics of Computing (Python)', credits: 3 },
                { code: 'ITH-112', name: 'Basics of Computing Lab', credits: 1 }
            ],
            'Biology': [
                { code: 'SHM-111', name: 'Biology for Engineers', credits: 3 },
                { code: 'SHM-112', name: 'Biology for Engineers Lab', credits: 1 }
            ]
        }
    },
    2: {
        common: [
            { code: 'CMP-100', name: 'Fund. of Programming (C)', credits: 3 },
            { code: 'CMP-101', name: 'Fund. of Programming Lab', credits: 1 },
            { code: 'SHM-134', name: 'Applied Mathematics - I', credits: 3 },
            { code: 'AEC-151', name: 'Creative Thinking & Innovation', credits: 2 },
            { code: 'AEC-152', name: 'Creative Thinking & Innovation Lab', credits: 1 },
            { code: 'VAC-156', name: 'Indian Knowledge System', credits: 2 },
            { code: 'VAC-157', name: 'Indian Knowledge System Lab', credits: 1 },
            { code: 'SEC-144', name: 'Electronics & Mechanical Workshop', credits: 3 }
        ],
        electives: {
            'Mech/Civil': [
                { code: 'MCV-111', name: 'Basics of Mech & Civil Engg', credits: 3 },
                { code: 'MCV-112', name: 'Basics of Mech & Civil Engg Lab', credits: 1 }
            ],
            'Chemistry': [
                { code: 'SHM-113', name: 'Engineering Chemistry', credits: 3 },
                { code: 'SHM-114', name: 'Engineering Chemistry Lab', credits: 1 }
            ]
        }
    },
    3: {
        common: [
            { code: 'EEL-200', name: 'DC Machines & Transformers', credits: 3 },
            { code: 'EEL-201', name: 'DC Machines & Transformers Lab', credits: 1 },
            { code: 'EEL-202', name: 'Electronic Devices and Circuits', credits: 3 },
            { code: 'EEL-203', name: 'Electronic Devices and Circuits Lab', credits: 1 },
            { code: 'SHM-232', name: 'Applied Mathematics - II', credits: 3 },
            { code: 'AEC-251', name: 'AEC Course', credits: 2 },
            { code: 'EEL-241', name: 'Electrical Workshop', credits: 3 },
        ],
        electives: {
            'Comm. Engg': [
                { code: 'EEL-221', name: 'Electromagnetic & Comm. Engg', credits: 3 },
                { code: 'EEL-222', name: 'Communication Engineering Lab', credits: 1 }
            ],
            'Material Science': [
                { code: 'EEL-223', name: 'Electrical & Elec. Material Science', credits: 3 },
                { code: 'EEL-224', name: 'Electrical & Elec. Material Science Lab', credits: 1 }
            ]
        }
    },
    4: {
        common: [
            { code: 'EEL-204', name: 'AC Machines', credits: 3 },
            { code: 'EEL-205', name: 'AC Machines Lab', credits: 1 },
            { code: 'EEL-206', name: 'Digital System Design', credits: 3 },
            { code: 'EEL-207', name: 'Digital System Design Lab', credits: 1 },
            { code: 'EEL-208', name: 'Electrical Circuits', credits: 3 },
            { code: 'EEL-209', name: 'Electrical Circuits Lab', credits: 1 },
            { code: 'EEL-210', name: 'Electrical & Elec. Instrumentation', credits: 3 },
            { code: 'EEL-211', name: 'Electrical & Elec. Instrumentation Lab', credits: 1 }
        ],
        electives: {
            'Utilization': [
                { code: 'EEL-225', name: 'Utilization Of Electrical Energy', credits: 3 },
                { code: 'EEL-226', name: 'Utilization Of Elect. Engg Lab', credits: 1 }
            ],
            'Numerical Techniques': [
                { code: 'EEL-227', name: 'Numerical Techniques', credits: 3 },
                { code: 'EEL-228', name: 'Numerical Techniques Lab', credits: 1 }
            ]
        }
    }
};

const mainContent = document.getElementById('main-content');
const toastBox = document.createElement('div');
toastBox.id = 'toast-box';
document.body.appendChild(toastBox);

function init() {
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
    renderStep2();
}

function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = msg;
    toastBox.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 10);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

function renderStep2() {
    const semData = SEMESTER_DATA[state.sem];
    if (!semData.electives || Object.keys(semData.electives).length === 0) {
        state.electiveGroup = null;
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
        if(firstInput) firstInput.focus();
    }, 200);
}

function updateMarks(code, value) {
    state.marks[code] = parseFloat(value);
}

function calculateSGPA() {
    const semData = SEMESTER_DATA[state.sem];
    let subjects = [...semData.common];
    if (state.electiveGroup && semData.electives[state.electiveGroup]) {
        subjects = [...subjects, ...semData.electives[state.electiveGroup]];
    }
    
    let totalPoints = 0;
    let totalCredits = 0;
    let errorMsg = null;

    for (const sub of subjects) {
        const marks = state.marks[sub.code];
        const maxMarks = sub.credits * 25;
        const el = document.getElementById(`input-${sub.code}`);
        
        if (marks === undefined || marks === '' || isNaN(marks)) {
            if(el) shakeInput(el);
            if(!errorMsg) errorMsg = "Please fill in all fields";
        } else if (marks < 0) {
            if(el) shakeInput(el);
            if(!errorMsg) errorMsg = "Marks cannot be negative";
        } else if (marks > maxMarks) {
            if(el) shakeInput(el);
            if(!errorMsg) errorMsg = `Marks for ${sub.code} cannot exceed ${maxMarks}`;
        } else {
            const percentage = (marks / maxMarks) * 100;
            const gradePoint = getGradePoint(percentage);
            totalPoints += gradePoint * sub.credits;
            totalCredits += sub.credits;
        }
    }
    
    if (errorMsg) {
        showToast(errorMsg);
        return;
    }
    
    const sgpa = totalPoints / totalCredits;
    renderResult(sgpa);
}

function getGradePoint(percentage) {
    if (percentage >= 90) return 10;
    if (percentage >= 80) return 9;
    if (percentage >= 70) return 8;
    if (percentage >= 60) return 7;
    if (percentage >= 50) return 6;
    if (percentage >= 40) return 5;
    return 0;
}

function renderResult(sgpa) {
    let message = "Keep it up!";
    if(sgpa > 9) message = "Outstanding!";
    else if(sgpa > 8) message = "Excellent Work!";
    else if(sgpa < 5) message = "You can do better!";

    mainContent.innerHTML = `
        <div class="step" id="result-step" style="text-align: center; padding: 2rem 0;">
            <p style="color: #666; text-transform: uppercase; letter-spacing: 0.1em; font-size: 0.9rem;">
                Semester ${state.sem} SGPA
            </p>
            <h2 style="font-size: 5rem; font-weight: 300; margin: 1rem 0 0.5rem 0; color: #fff;">
                ${sgpa.toFixed(2)}
            </h2>
            <p style="color: #888; margin-bottom: 2rem;">${message}</p>
            <button class="primary" onclick="restart()">Calculate Another</button>
        </div>
    `;
}

function shakeInput(el) {
    el.style.borderColor = '#ff4444';
    el.classList.add('shake');
    setTimeout(() => el.style.borderColor = '', 1000);
}

function restart() {
    state.sem = null;
    state.electiveGroup = null;
    state.marks = {};
    renderStep1();
}

window.selectSemester = selectSemester;
window.selectElective = selectElective;
window.updateMarks = updateMarks;
window.calculateSGPA = calculateSGPA;
window.renderStep1 = renderStep1;
window.renderStep2 = renderStep2;
window.restart = restart;

init();
