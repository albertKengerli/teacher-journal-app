import { Grade } from "../../common/entities/grades";

export interface EditableGradesState {
  readonly data: Grade[];
  readonly initialData: Grade[];
}

export const initialEditableGradesState: EditableGradesState = {
  data: [],
  initialData: [],
};
