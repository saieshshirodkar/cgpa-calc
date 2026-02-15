import { showToast, shakeInput } from './helpers.js';

export function validateMarkInput(code, maxMarksStr, marks) {
  const val = marks[code];
  const maxMarks = parseFloat(maxMarksStr);
  const el = document.getElementById(`input-${code}`);

  if (val === undefined || isNaN(val)) return { valid: true };

  if (val < 0) {
    if (el) {
      shakeInput(el);
      el.value = '';
      setTimeout(() => el.focus(), 50);
    }
    return { valid: false, error: 'negative' };
  }

  if (val > maxMarks) {
    if (el) {
      shakeInput(el);
      el.value = '';
      setTimeout(() => el.focus(), 50);
    }
    showToast(`Marks cannot exceed ${maxMarks}`, 3000, 'error');
    return { valid: false, error: 'exceeds', max: maxMarks };
  }

  return { valid: true };
}

export function validateTargetSGPA(value) {
  const val = parseFloat(value);
  if (isNaN(val)) {
    return { valid: false, error: 'invalid' };
  }
  if (val < 0 || val > 10) {
    return { valid: false, error: 'range' };
  }
  return { valid: true, value: val };
}

export function isValidNumber(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}
