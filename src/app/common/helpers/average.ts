import { SimpleGradesObject } from '../entities/grades';

export function calculateAverageGrade(grades: SimpleGradesObject): string{
  const gradesArray = Object.values(grades)
  let sum = gradesArray.reduce( (acc, grade) => acc + grade, 0);
  const average = sum / gradesArray.length;    
  return average.toFixed(1);
}