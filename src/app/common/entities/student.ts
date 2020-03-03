import { SimpleGradesObject } from './grades';

export interface Person {
  id: string,
  name: string,
  surname: string,
}

export interface Student extends Person {
  address: string,
  description: string,
}

export interface StudentWithGrades extends Person {
  grades: SimpleGradesObject,
}
