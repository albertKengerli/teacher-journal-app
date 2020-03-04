import { Routes } from "@angular/router";

import { SubjectsPageComponent } from "../../components/subjects/subjects-page/subjects-page.component";
import { SubjectFormComponent } from "../../components/subjects/subject-form/subject-form.component";
import { SubjectDetailsComponent } from "../../components/subjects/subject-details/subject-details.component";
import { NotFoundComponent } from "../../components/misc/not-found/not-found.component";

export const subjectsRoutes: Routes = [
  {
    path: "add",
    component: SubjectFormComponent,
    data: { breadcrumb: "Add subject"},
  },
  {
    path: ":name",
    component: SubjectDetailsComponent,
    data: { breadcrumb: "Subject page"},
  },
  {
    path: "",
    pathMatch: "full",
    component: SubjectsPageComponent,
  },
  {
    path: "**",
    component: NotFoundComponent,
  }
];
