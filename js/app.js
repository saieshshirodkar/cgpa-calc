function init() {
     // Check for legacy state or missing new fields
    const saved = localStorage.getItem('gradeCalcState');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            // If it's the old state format (no scheme), wipe it
            if (!parsed.scheme) {
                localStorage.removeItem('gradeCalcState');
                renderSchemeSelection();
                return;
            }
        } catch (e) {
             localStorage.removeItem('gradeCalcState');
        }
    }

     if (!loadState()) {
        renderSchemeSelection();
    }
    
    // Event Delegation
    document.body.addEventListener('change', (e) => {
        if (e.target.classList.contains('mark-input')) {
            updateMarks(e.target.dataset.code, e.target.value);
        }
    });

    document.body.addEventListener('focusout', (e) => {
        if (e.target.classList.contains('mark-input')) {
            validateInput(e.target.dataset.code, e.target.dataset.max);
        }
        if (e.target.id === 'target-sgpa') {
            const val = parseFloat(e.target.value);
            if (val < 0 || val > 10) {
                shakeInput(e.target);
                e.target.value = '';
                showToast("Target SGPA must be between 0 and 10");
            }
        }
    });

    document.body.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.classList.contains('mark-input')) {
            e.preventDefault();
            const inputs = Array.from(document.querySelectorAll('.mark-input'));
            const index = inputs.indexOf(e.target);
            if (index > -1 && index < inputs.length - 1) {
                inputs[index + 1].focus();
            } else if (index === inputs.length - 1) {
                // Last input, maybe trigger calculation
                calculateSGPA();
            }
        }
    });

}

init();
