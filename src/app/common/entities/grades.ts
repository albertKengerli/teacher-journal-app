export interface Grade {
  student: string;
  date: string;
  grade: number;
}

export interface SimpleGradesObject {
  [date: string]: number;
}

export interface GradesObject {
  [key: string]: Grade[];
}
