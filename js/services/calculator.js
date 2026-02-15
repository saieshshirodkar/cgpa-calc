import { CONSTANTS } from '../config/constants.js';

class GradeCalculator {
  getGradePoint(percentage) {
    if (percentage >= CONSTANTS.GRADES.O.min) return CONSTANTS.GRADES.O.point;
    if (percentage >= CONSTANTS.GRADES.A.min) return CONSTANTS.GRADES.A.point;
    if (percentage >= CONSTANTS.GRADES.B.min) return CONSTANTS.GRADES.B.point;
    if (percentage >= CONSTANTS.GRADES.C.min) return CONSTANTS.GRADES.C.point;
    if (percentage >= CONSTANTS.GRADES.D.min) return CONSTANTS.GRADES.D.point;
    if (percentage >= CONSTANTS.GRADES.E.min) return CONSTANTS.GRADES.E.point;
    return CONSTANTS.GRADES.F.point;
  }

  getGradeLetter(percentage) {
    if (percentage >= CONSTANTS.GRADES.O.min) return 'O';
    if (percentage >= CONSTANTS.GRADES.A.min) return 'A';
    if (percentage >= CONSTANTS.GRADES.B.min) return 'B';
    if (percentage >= CONSTANTS.GRADES.C.min) return 'C';
    if (percentage >= CONSTANTS.GRADES.D.min) return 'D';
    if (percentage >= CONSTANTS.GRADES.E.min) return 'E';
    return 'F';
  }

  calculateSGPA(subjects, marks) {
    if (!Array.isArray(subjects)) {
      return { error: 'invalid_subjects' };
    }
    
    if (!marks || typeof marks !== 'object') {
      return { error: 'invalid_marks' };
    }

    let totalPoints = 0;
    let totalCredits = 0;

    for (const sub of subjects) {
      if (!sub || typeof sub !== 'object') continue;
      
      const credits = parseFloat(sub.credits);
      if (isNaN(credits) || credits <= 0) continue;

      const mark = marks[sub.code];
      if (mark === undefined || mark === '' || isNaN(mark)) {
        return { error: 'incomplete', subject: sub.code };
      }

      const numericMark = parseFloat(mark);
      const maxMarks = sub.max !== undefined ? parseFloat(sub.max) : (credits * 25);
      
      if (isNaN(maxMarks) || maxMarks <= 0) {
        console.warn(`Invalid maxMarks for subject ${sub.code}:`, sub.max);
        continue;
      }
      
      if (numericMark < 0) {
        return { error: 'negative', subject: sub.code };
      }
      
      if (numericMark > maxMarks) {
        return { error: 'exceeds', subject: sub.code, max: maxMarks };
      }

      const percentage = (numericMark / maxMarks) * 100;
      const gradePoint = this.getGradePoint(percentage);
      totalPoints += gradePoint * credits;
      totalCredits += credits;
    }

    if (totalCredits === 0) {
      return { error: 'no_credits' };
    }

    return { sgpa: totalPoints / totalCredits, totalPoints, totalCredits };
  }

  hasPassed(sgpa) {
    if (typeof sgpa !== 'number' || isNaN(sgpa)) {
      return false;
    }
    return sgpa >= CONSTANTS.MIN_PASS_SGPA;
  }

  solveForTarget(subjects, marks, targetSGPA) {
    if (!Array.isArray(subjects) || subjects.length === 0) {
      return { error: 'invalid_subjects' };
    }
    
    if (typeof targetSGPA !== 'number' || isNaN(targetSGPA) || targetSGPA < 0 || targetSGPA > 10) {
      return { error: 'invalid_target' };
    }

    let totalCredits = 0;
    let currentPoints = 0;
    const unfilled = [];

    subjects.forEach(sub => {
      if (!sub || typeof sub !== 'object') return;
      
      const credits = parseFloat(sub.credits);
      if (isNaN(credits) || credits <= 0) return;
      
      const maxMarks = sub.max !== undefined ? parseFloat(sub.max) : (credits * 25);
      if (isNaN(maxMarks) || maxMarks <= 0) return;

      totalCredits += credits;
      const val = marks?.[sub.code];
      if (val !== undefined && val !== '' && !isNaN(parseFloat(val))) {
        const percentage = (parseFloat(val) / maxMarks) * 100;
        currentPoints += this.getGradePoint(percentage) * credits;
      } else {
        unfilled.push({ ...sub, credits, maxMarks });
      }
    });

    if (unfilled.length === 0) {
      return { error: 'all_filled' };
    }

    const remainingCredits = unfilled.reduce((acc, sub) => acc + sub.credits, 0);
    const targetPoints = targetSGPA * totalCredits;
    const neededFromRemaining = targetPoints - currentPoints;

    if (neededFromRemaining > (remainingCredits * 10)) {
      const maxPossible = totalCredits > 0 ? (currentPoints + (remainingCredits * 10)) / totalCredits : 0;
      return { error: 'impossible', maxPossible };
    }

    if (neededFromRemaining <= 0) {
      return { marks: unfilled.map(sub => ({ code: sub.code, marks: 0 })) };
    }

    const predictions = [];
    let tempRemainingNeeded = neededFromRemaining;
    let tempRemainingCredits = remainingCredits;

    unfilled.forEach(sub => {
      const avgGP = tempRemainingCredits > 0 ? tempRemainingNeeded / tempRemainingCredits : 0;
      let gp = Math.ceil(avgGP);
      if (gp > 0 && gp < 5) gp = 5;
      if (gp > 10) gp = 10;

      const maxMarks = sub.maxMarks;
      const thresholds = { 10: 90, 9: 80, 8: 70, 7: 60, 6: 50, 5: 40, 0: 0 };
      const percentage = thresholds[gp] || 0;
      const marks = Math.ceil((percentage / 100) * maxMarks);

      predictions.push({ code: sub.code, marks });

      tempRemainingNeeded -= (gp * sub.credits);
      tempRemainingCredits -= sub.credits;
    });

    return { marks: predictions };
  }
}

const calculator = new GradeCalculator();

export { GradeCalculator, calculator };
