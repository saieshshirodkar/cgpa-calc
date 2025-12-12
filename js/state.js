const state = {
    sem: null,
    electiveGroup: null,
    marks: {} 
};

function saveState() {
    localStorage.setItem('gradeCalcState', JSON.stringify(state));
}
