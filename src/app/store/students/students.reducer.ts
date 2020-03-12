import { StudentsActionNames, StudentsAction } from "./students.actions";
import { StudentsState, initialStudentsState } from "./students.state";

// import { Student } from "../../common/entities/student";

export function studentsReducer(
  state: StudentsState = initialStudentsState,
  action: StudentsAction
): StudentsState {
  console.log(`Action! ${action.type}`);

  switch (action.type) {
    case StudentsActionNames.GET_STUDENTS: {
      console.log("GET_STUDENTS case!");
      return {...state};
    }

    case StudentsActionNames.ADD_STUDENT: {
      console.log("ADD_STUDENT case!");
      return {...state};
    }
    default: {
      console.log("UNKNOWN_ACTION case!");
      return state;
    }
  }
}
