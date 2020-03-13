export interface Person {
  id: number;
  name: string;
  surname: string;
}

export interface Student extends Person {
  address: string;
  description: string;
  averageGrade?: string;
  [date: number]: string;
}
