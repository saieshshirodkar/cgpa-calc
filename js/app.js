function init() {
    if (!loadState()) {
        renderBranchSelection();
    }

    document.body.addEventListener('change', (e) => {
        if (e.target.classList.contains('mark-input')) {
            updateMarks(e.target.dataset.code, e.target.value);
            e.target.classList.remove('empty-field');
            const parentRow = e.target.closest('.item-row');
            if (parentRow) {
                parentRow.style.opacity = '1';
                const label = parentRow.querySelector('.item-label');
                if (label) {
                    const asterisk = label.querySelector('span');
                    if (asterisk) asterisk.remove();
                }
            }
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
                calculateSGPA();
            }
        }
    });

}

init();
