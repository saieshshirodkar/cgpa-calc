class StateManager {
  constructor() {
    this.state = {
      branch: null,
      sem: null,
      electiveSelections: {},
      track: null,
      marks: {}
    };
  }

  get() {
    return this.state;
  }

  set(key, value) {
    this.state[key] = value;
  }

  reset() {
    this.state = {
      branch: null,
      sem: null,
      electiveSelections: {},
      track: null,
      marks: {}
    };
  }

  clearMarks() {
    this.state.marks = {};
  }

  updateMark(code, value) {
    const parsed = parseFloat(value);
    if (value === '' || isNaN(parsed)) {
      delete this.state.marks[code];
    } else {
      this.state.marks[code] = parsed;
    }
  }

  hasMark(code) {
    return code in this.state.marks;
  }

  getMark(code) {
    return this.state.marks[code];
  }
}

const appState = new StateManager();

export { StateManager, appState };
