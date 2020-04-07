export interface Person {
  id: number;
  name: string;
  surname: string;
}

export interface Student extends Person {
  address: string;
  description: string;
  averageGrade?: number;
  [date: number]: number;
}
