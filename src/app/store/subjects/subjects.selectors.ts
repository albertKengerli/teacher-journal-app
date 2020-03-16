import { createFeatureSelector } from "@ngrx/store";

import { SubjectsState } from "./subjects.state";

import { entitiesNames } from "../../common/constants/entitiesNames";

/* tslint:disable-next-line:typedef */
export const getSubjectsState = createFeatureSelector<SubjectsState>(entitiesNames.subjects);
