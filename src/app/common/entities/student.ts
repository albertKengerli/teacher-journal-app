import { SimpleGradesObject } from './grades';

export interface Student {
  id: string,
  name: string,
  surname: string,
  address: string,
  description: string,
}

export interface StudentWithGrades {
  id: string,
  name: string,
  surname: string,
  grades: SimpleGradesObject,
}
