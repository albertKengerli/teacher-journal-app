import { Subject } from "../../common/entities/subject";

export interface SubjectsState {
  readonly data: Subject[];
  readonly loading: boolean;
  readonly loaded: boolean;
}

export const initialSubjectsState: SubjectsState = {
  data: [],
  loading: false,
  loaded: false,
};
