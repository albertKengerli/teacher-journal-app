import { Column } from "../entities/column";

export const defaultColumns: Column[] = [
  {
    name: "name",
    header: "Name",
    pipe: "name",
  },
  {
    name: "surname",
    header: "Last Name",
    pipe: "surname",
  },
  {
    name: "averageGrade",
    header: "Average Mark",
    pipe: "averageGrade",
  }
];
