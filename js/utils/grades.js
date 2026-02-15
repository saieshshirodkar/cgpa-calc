import { calculator } from '../services/calculator.js';

export function getGradePoint(percentage) {
  if (typeof percentage !== 'number' || isNaN(percentage)) {
    return 0;
  }
  return calculator.getGradePoint(percentage);
}

export function getGradeLetter(percentage) {
  if (typeof percentage !== 'number' || isNaN(percentage)) {
    return 'F';
  }
  return calculator.getGradeLetter(percentage);
}

export function calculateSGPA(subjects, marks) {
  return calculator.calculateSGPA(subjects, marks);
}

export function hasPassed(sgpa) {
  return calculator.hasPassed(sgpa);
}
