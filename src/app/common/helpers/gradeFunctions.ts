import { GradesConstants } from "../constants/gradesConstants";
import { Colors } from "../constants/colors";

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
