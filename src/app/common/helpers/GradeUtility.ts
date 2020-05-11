import { GradesConstants } from "../constants/gradesConstants";
import { Colors } from "../constants/colors";
import { Grade } from "../entities/grades";
import { Student } from "../entities/student";

export interface GradeSumAndLength {
  gradeSum: number;
  gradeQuantity: number;
}

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

export function generateId(studentId: number, subjectId: number, date: number): number {
  let newId: number = parseInt(`${studentId}${subjectId}${date}`, 10);
  return newId;
}

export function calculateAverageGrade(gradeSum: number, gradesQuantity: number): number {
  if (gradeSum === 0) {
    return null;
  } else {
    return Math.ceil(gradeSum / gradesQuantity * 100) / 100;
  }
}

export function getGradeSumAndLengthForStudent(student: Student): GradeSumAndLength{
  return Object.keys(student).reduce(
    (acc, property) => {
      const propertyIsGrade: boolean = !isNaN(property as any);
      if (propertyIsGrade && student[property] !== null) {
        acc.gradeSum += student[property];
        acc.gradeQuantity++;

      }
      return acc;
    },
    {
      gradeSum: 0,
      gradeQuantity: 0,
    }
  );
}
