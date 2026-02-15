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
    let totalPoints = 0;
    let totalCredits = 0;

    for (const sub of subjects) {
      if (sub.credits === 0) continue;

      const mark = marks[sub.code];
      if (mark === undefined || mark === '' || isNaN(mark)) {
        return { error: 'incomplete', subject: sub.code };
      }

      const maxMarks = sub.max !== undefined ? sub.max : (sub.credits * 25);
      
      if (mark < 0) {
        return { error: 'negative', subject: sub.code };
      }
      
      if (mark > maxMarks) {
        return { error: 'exceeds', subject: sub.code, max: maxMarks };
      }

      const percentage = (mark / maxMarks) * 100;
      const gradePoint = this.getGradePoint(percentage);
      totalPoints += gradePoint * sub.credits;
      totalCredits += sub.credits;
    }

    if (totalCredits === 0) {
      return { error: 'no_credits' };
    }

    return { sgpa: totalPoints / totalCredits, totalPoints, totalCredits };
  }

  hasPassed(sgpa) {
    return sgpa >= CONSTANTS.MIN_PASS_SGPA;
  }

  solveForTarget(subjects, marks, targetSGPA) {
    let totalCredits = 0;
    let currentPoints = 0;
    const unfilled = [];

    subjects.forEach(sub => {
      if (sub.credits === 0) return;
      const maxMarks = sub.max !== undefined ? sub.max : (sub.credits * 25);
      if (maxMarks === 0) return;

      totalCredits += sub.credits;
      const val = marks[sub.code];
      if (val !== undefined && val !== '' && !isNaN(parseFloat(val))) {
        const percentage = (parseFloat(val) / maxMarks) * 100;
        currentPoints += this.getGradePoint(percentage) * sub.credits;
      } else {
        unfilled.push(sub);
      }
    });

    if (unfilled.length === 0) {
      return { error: 'all_filled' };
    }

    const remainingCredits = unfilled.reduce((acc, sub) => acc + sub.credits, 0);
    const targetPoints = targetSGPA * totalCredits;
    const neededFromRemaining = targetPoints - currentPoints;

    if (neededFromRemaining > (remainingCredits * 10)) {
      const maxPossible = (currentPoints + (remainingCredits * 10)) / totalCredits;
      return { error: 'impossible', maxPossible };
    }

    if (neededFromRemaining <= 0) {
      return { marks: unfilled.map(sub => ({ code: sub.code, marks: 0 })) };
    }

    const predictions = [];
    let tempRemainingNeeded = neededFromRemaining;
    let tempRemainingCredits = remainingCredits;

    unfilled.forEach(sub => {
      const avgGP = tempRemainingNeeded / tempRemainingCredits;
      let gp = Math.ceil(avgGP);
      if (gp > 0 && gp < 5) gp = 5;
      if (gp > 10) gp = 10;

      const maxMarks = sub.max !== undefined ? sub.max : (sub.credits * 25);
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
