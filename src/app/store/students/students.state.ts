import { Student } from "../../common/entities/student";

export interface StudentsState {
  readonly data: Student[];
  readonly loading: boolean;
  readonly loaded: boolean;
}

export const initialStudentsState: StudentsState = {
  data: [],
  loading: false,
  loaded: false,
};
