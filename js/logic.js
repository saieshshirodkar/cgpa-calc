function updateMarks(code, value) {
    const parsed = parseFloat(value);
    if (value === '' || isNaN(parsed)) {
        delete state.marks[code];
    } else {
        state.marks[code] = parsed;
    }
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
            el.value = "";
            setTimeout(() => el.focus(), 50);
        }
        delete state.marks[code];
        saveState();
        showToast(error, 3000, 'error');
    }
}

function calculateSGPA() {
    const semData = DATA[state.branch]?.[state.sem];

    if (!semData) {
        showToast("Semester data not found");
        return;
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
        if (sub.credits === 0) continue;

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
        showToast(errorMsg, 3000, 'error');
        return;
    }

    if (totalCredits === 0) {
        showToast("No credits to calculate!");
        return;
    }

    const sgpa = totalPoints / totalCredits;
    renderResult(sgpa);
}

function solveForTarget() {
    const targetEl = document.getElementById('target-sgpa');
    const targetValue = targetEl.value;

    if (!targetValue || isNaN(parseFloat(targetValue))) {
        showToast("Please enter a target SGPA", 3000, 'error');
        return;
    }

    const target = parseFloat(targetValue);
    if (target < 0 || target > 10) {
        showToast("SGPA must be between 0 and 10", 3000, 'error');
        return;
    }

    const semData = DATA[state.branch]?.[state.sem];
    if (!semData) return;

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

    let totalCredits = 0;
    let currentPoints = 0;
    const unfilled = [];

    subjects.forEach(sub => {
        if (sub.credits === 0) return;
        const maxMarks = sub.max !== undefined ? sub.max : (sub.credits * 25);
        if (maxMarks === 0) return;

        totalCredits += sub.credits;
        const val = state.marks[sub.code];
        if (val !== undefined && val !== '' && !isNaN(parseFloat(val))) {
            const percentage = (parseFloat(val) / maxMarks) * 100;
            currentPoints += getGradePoint(percentage) * sub.credits;
        } else {
            unfilled.push(sub);
        }
    });

    if (unfilled.length === 0) {
        showToast("All fields are already filled");
        return;
    }

    const remainingCredits = unfilled.reduce((acc, sub) => acc + sub.credits, 0);
    const targetPoints = target * totalCredits;
    const neededFromRemaining = targetPoints - currentPoints;

    if (neededFromRemaining > (remainingCredits * 10)) {
        const maxPossible = (currentPoints + (remainingCredits * 10)) / totalCredits;
        showToast(`Impossible! Max possible SGPA is ${maxPossible.toFixed(2)}`);
        return;
    }

    if (neededFromRemaining <= 0) {
        unfilled.forEach(sub => {
            state.marks[sub.code] = 0;
            const input = document.getElementById(`input-${sub.code}`);
            if (input) input.value = 0;
        });
        saveState();
        showToast("Target already reached! Filling rest with 0.");
        return;
    }

    let tempRemainingNeeded = neededFromRemaining;
    let tempRemainingCredits = remainingCredits;

    unfilled.forEach((sub, i) => {
        const avgGP = tempRemainingNeeded / tempRemainingCredits;
        let gp = Math.ceil(avgGP);
        if (gp > 0 && gp < 5) gp = 5;
        if (gp > 10) gp = 10;

        const maxMarks = sub.max !== undefined ? sub.max : (sub.credits * 25);
        const thresholds = { 10: 90, 9: 80, 8: 70, 7: 60, 6: 50, 5: 40, 0: 0 };
        const percentage = thresholds[gp] || 0;
        const marks = Math.ceil((percentage / 100) * maxMarks);

        state.marks[sub.code] = marks;
        const input = document.getElementById(`input-${sub.code}`);
        if (input) input.value = marks;

        tempRemainingNeeded -= (gp * sub.credits);
        tempRemainingCredits -= sub.credits;
    });

    saveState();
    showToast("Marks predicted and filled!", 3000, 'success');
}
