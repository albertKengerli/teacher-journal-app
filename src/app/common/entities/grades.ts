export interface Grade {
  student: string;
  date: string;
  grade: number;
}

export interface GradesObject {
  [key: string]: Grade[];
}
