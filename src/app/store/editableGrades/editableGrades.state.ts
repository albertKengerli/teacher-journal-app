import { Grade } from "../../common/entities/grades";

export interface EditableGradesState {
  readonly data: Grade[];
}

export const initialEditableGradesState: EditableGradesState = {
  data: [],
};
