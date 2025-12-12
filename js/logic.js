function updateMarks(code, value) {
    state.marks[code] = parseFloat(value);
    saveState();
}

function validateInput(code, maxMarksStr) {
    const val = state.marks[code];
    const maxMarks = parseFloat(maxMarksStr);
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
    
    let totalPoints = 0;
    let totalCredits = 0;
    let errorMsg = null;

    for (const sub of subjects) {
        if (sub.credits === 0) continue; // Skip audit

        const marks = state.marks[sub.code];
        const maxMarks = sub.max !== undefined ? sub.max : (sub.credits * 25);
        const el = document.getElementById(`input-${sub.code}`);
        
        if (marks === undefined || marks === '' || isNaN(marks)) {
            if(el) shakeInput(el);
            if(!errorMsg) errorMsg = "Please fill in all fields";
        } else if (marks < 0) {
            if(el) shakeInput(el);
            if(!errorMsg) errorMsg = "Marks cannot be negative";
        } else if (marks > maxMarks) {
            // Re-validate max marks just in case
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
    
    if (totalCredits === 0) {
        showToast("No credits to calculate!");
        return;
    }

    const sgpa = totalPoints / totalCredits;
    renderResult(sgpa);
}
