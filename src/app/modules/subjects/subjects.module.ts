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

@NgModule({
  declarations: [
    SubjectsRootComponent,
    SubjectsPageComponent,
    SubjectsListComponent,
    SubjectFormComponent,
    SubjectDetailsComponent,
    SubjectTableComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  providers: [DatePipe],
})
export class SubjectsModule { }
