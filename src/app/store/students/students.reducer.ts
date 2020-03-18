import { StudentsActionNames, StudentsAction } from "./students.actions";
import { StudentsState, initialStudentsState } from "./students.state";

import { Student } from "../../common/entities/student";

export function studentsReducer(
  state: StudentsState = initialStudentsState,
  action: StudentsAction
): StudentsState {

  switch (action.type) {
    case StudentsActionNames.GET_STUDENTS: {
      return {
        ...state,
        loading: true,
      };
    }

    case StudentsActionNames.GET_STUDENTS_SUCCESS: {
      const data: Student[] = [...action.payload];
      return {
        ...state,
        data,
        loading: false,
        loaded: true,
      };
    }

    case StudentsActionNames.ADD_STUDENT: {
      return {...state};
    }

    case StudentsActionNames.ADD_STUDENT_SUCCESS: {
      const data: Student[] = [...state.data, action.payload];

      return {
        ...state,
        data,
      };
    }

    case StudentsActionNames.DELETE_STUDENT: {
      return { ...state };
    }

    case StudentsActionNames.DELETE_STUDENT_SUCCESS: {
      const data: Student[] = [ ...state.data ].filter(student => student.id !== action.payload);

      return {
        ...state,
        data,
      };
    }

    default: {
      return state;
    }
  }
}
