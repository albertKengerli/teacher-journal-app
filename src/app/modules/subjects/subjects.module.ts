import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DatePipe } from "@angular/common";

import { SharedModule } from "../shared/shared.module";

import { SubjectsRootComponent } from "../../components/subjects/subjects-root/subjects-root.component";
import { SubjectsPageComponent } from "../../components/subjects/subjects-page/subjects-page.component";
import { SubjectsListComponent } from "../../components/subjects/subjects-list/subjects-list.component";
import { SubjectFormComponent } from "../../components/subjects/subject-form/subject-form.component";
import { SubjectDetailsComponent } from "../../components/subjects/subject-details/subject-details.component";
import { SubjectTableComponent } from "../../components/subjects/subject-table/subject-table.component";

import { SubjectsRoutingModule } from "./subjects-routing.module";

import { GradeHighlightDirective } from "../../common/directives/grade-highlight.directive";
import { GradeRowHighlightDirective } from "../../common/directives/grade-row-highlight.directive";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { subjectsReducer, SubjectsEffects } from "../../store/subjects";
import { subjectTableReducer } from "../../store/subjectTable";

@NgModule({
  declarations: [
    SubjectsRootComponent,
    SubjectsPageComponent,
    SubjectsListComponent,
    SubjectFormComponent,
    SubjectDetailsComponent,
    SubjectTableComponent,
    GradeHighlightDirective,
    GradeRowHighlightDirective,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SubjectsRoutingModule,
    StoreModule.forFeature("subjects", subjectsReducer),
    StoreModule.forFeature("subjectTable", subjectTableReducer),
    EffectsModule.forFeature([SubjectsEffects]),
  ],
  providers: [DatePipe],
})
export class SubjectsModule { }
