import { createFeatureSelector } from "@ngrx/store";

import { StudentsState } from "./students.state";

import { entitiesNames } from "../../common/constants/entitiesNames";

/* tslint:disable-next-line:typedef */
export const getStudentsState = createFeatureSelector<StudentsState>(entitiesNames.students);
