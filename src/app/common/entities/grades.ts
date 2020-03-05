export interface Grade {
  student: string;
  date: Date;
  grade: number;
}

export interface GradesObject {
  [key: string]: Grade[];
}
