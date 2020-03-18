import { Action } from "@ngrx/store";

import { Student } from "../../common/entities/student";

export enum StudentsActionNames {
  GET_STUDENTS = "[Students] GET_STUDENTS",
  GET_STUDENT = "[Students] GET_STUDENT",
  ADD_STUDENT = "[Students] ADD_STUDENT",
  DELETE_STUDENT = "[Students] DELETE_STUDENT",
  UPDATE_STUDENT = "[Students] UPDATE_STUDENT",
  GET_STUDENTS_SUCCESS = "[Students] GET_STUDENTS_SUCCESS",
  ADD_STUDENT_SUCCESS = "[Students] ADD_STUDENT_SUCCESS",
  DELETE_STUDENT_SUCCESS = "[Students] DELETE_STUDENT_SUCCESS",
}

export class GetStudents implements Action {
  public readonly type: string = StudentsActionNames.GET_STUDENTS;
}

export class GetStudent implements Action {
  public readonly type: string = StudentsActionNames.GET_STUDENT;
  constructor(public payload: number) { }
}

export class AddStudent implements Action {
  public readonly type: string = StudentsActionNames.ADD_STUDENT;
  constructor(public payload: Student) { }
}

export class DeleteStudent implements Action {
  public readonly type: string = StudentsActionNames.DELETE_STUDENT;
  constructor(public payload: number) { }
}

export class UpdateStudent implements Action {
  public readonly type: string = StudentsActionNames.UPDATE_STUDENT;
  constructor(public payload: { id: number, student: Student }) { }
}

export class GetStudentsSuccess implements Action {
  public readonly type: string = StudentsActionNames.GET_STUDENTS_SUCCESS;
  constructor(public payload: Student[]) { }
}

export class AddStudentSuccess implements Action {
  public readonly type: string = StudentsActionNames.ADD_STUDENT_SUCCESS;
  constructor(public payload: Student) { }
}

export class DeleteStudentSuccess implements Action {
  public readonly type: string = StudentsActionNames.DELETE_STUDENT_SUCCESS;
  constructor(public payload: number) { }
}

export type StudentsAction =
  & GetStudents
  & GetStudentsSuccess
  & AddStudent
  & AddStudentSuccess
  & DeleteStudent
  & UpdateStudent;
