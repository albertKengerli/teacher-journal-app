import { Grade } from "../../common/entities/grades";

export interface GradesState {
  readonly data: Grade[];
  readonly loading: boolean;
  readonly loaded: boolean;
}

export const initialGradesState: GradesState = {
  data: [],
  loading: false,
  loaded: false,
};
