const state = {
    branch: null,
    sem: null,
    electiveSelections: {},
    track: null,
    marks: {}
};

function saveState() {
    localStorage.setItem('gradeCalcState', JSON.stringify(state));
}
