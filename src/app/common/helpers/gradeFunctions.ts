import { GradesConstants } from "../constants/gradesConstants";
import { Colors } from "../constants/colors";
import { Grade } from "../entities/grades";

export function isGradeValid(grade: number): boolean {
  if (grade < GradesConstants.MinGrade || grade > GradesConstants.MaxGrade || isNaN(grade)) {
    return false;
  } else {
    return true;
  }
}

export function isGradePositive(grade: number): boolean {
  if (grade < GradesConstants.PositivenessBorder) {
    return false;
  } else {
    return true;
  }
}

export function getColorForGrade(grade: number): string {
  if (isGradePositive(grade)) {
    return Colors.PositiveColor;
  } else {
    return Colors.NegativeColor;
  }
}

export function areGradesInterchangeable(grade1: Grade, grade2: Grade): boolean {
  if (
    grade1.studentId === grade2.studentId &&
    grade1.subjectId === grade2.subjectId &&
    grade1.date === grade2.date
  ) {
    return true;
  } else {
    return false;
  }
}
