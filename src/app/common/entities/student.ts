export interface Person {
  id: string;
  name: string;
  surname: string;
}

export interface Student extends Person {
  address: string;
  description: string;
  averageGrade?: string;
  [date: string]: string;
}
