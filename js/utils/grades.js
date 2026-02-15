import { calculator } from '../services/calculator.js';

export function getGradePoint(percentage) {
  return calculator.getGradePoint(percentage);
}

export function getGradeLetter(percentage) {
  return calculator.getGradeLetter(percentage);
}

export function calculateSGPA(subjects, marks) {
  return calculator.calculateSGPA(subjects, marks);
}

export function hasPassed(sgpa) {
  return calculator.hasPassed(sgpa);
}
