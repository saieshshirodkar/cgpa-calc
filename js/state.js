const state = {
    scheme: null, // 'RC2019-20' or 'RC2024-25'
    branch: null, // 'ENE', 'COMP', etc.
    sem: null,
    electiveSelections: {}, // For 'slot' mode: { "SlotName": "SubjectCode" }
    track: null, // For 'track' mode: "Computing" or "Biology"
    marks: {} 
};

function saveState() {
    localStorage.setItem('gradeCalcState', JSON.stringify(state));
}
