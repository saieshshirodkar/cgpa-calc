function updateMarks(code, value) {
    state.marks[code] = parseFloat(value);
    saveState();
}

function validateInput(code, maxMarks) {
    const val = state.marks[code];
    const el = document.getElementById(`input-${code}`);
    
    if (val === undefined || isNaN(val)) return; 
    
    let error = null;
    if (val < 0) error = "Marks cannot be negative";
    else if (val > maxMarks) error = `Marks cannot exceed ${maxMarks}`;
    
    if (error) {
        if(el) {
            shakeInput(el);
            el.value = ""; // Clear invalid input
            setTimeout(() => el.focus(), 50); // Force focus back
        }
        delete state.marks[code]; // Remove invalid value from state
        saveState(); // Save the removal
        showToast(error);
    }
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
