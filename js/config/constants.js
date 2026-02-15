const CONSTANTS = {
  GRADES: {
    O: { min: 90, point: 10 },
    A: { min: 80, point: 9 },
    B: { min: 70, point: 8 },
    C: { min: 60, point: 7 },
    D: { min: 50, point: 6 },
    E: { min: 40, point: 5 },
    F: { min: 0, point: 0 }
  },
  MIN_PASS_SGPA: 5.0,
  STORAGE_KEY: 'gradeCalcState'
};

const BRANCHES = {
  COMP: 'Computer Engineering',
  IT: 'Information Technology',
  ETC: 'Electronics & Telecom',
  ENE: 'Electronics & Electrical',
  MECH: 'Mechanical Engineering',
  CIVIL: 'Civil Engineering',
  VLSI: 'VLSI'
};

const STEPS = {
  BRANCH: 'branch',
  SEMESTER: 'semester',
  ELECTIVE: 'elective',
  MARKS: 'marks',
  RESULT: 'result'
};

const PROGRESS_LABELS = {
  [STEPS.BRANCH]: 'Step 1 of 4',
  [STEPS.SEMESTER]: 'Step 2 of 4',
  [STEPS.ELECTIVE]: 'Step 3 of 4',
  [STEPS.MARKS]: 'Step 4 of 4',
  [STEPS.RESULT]: 'Results'
};

export { CONSTANTS, BRANCHES, STEPS, PROGRESS_LABELS };
