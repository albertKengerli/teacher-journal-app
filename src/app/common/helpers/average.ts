import { SimpleGradesObject } from "../entities/grades";

export function calculateAverageGrade(grades: SimpleGradesObject): string {
  const gradesArray: number[] = Object.values(grades);
  let sum: number = gradesArray.reduce( (acc, grade) => acc + grade, 0);
  const average: number = sum / gradesArray.length;
  return average.toFixed(1);
}
