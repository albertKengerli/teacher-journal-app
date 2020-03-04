import { Routes } from "@angular/router";

import { StudentsPageComponent } from "../../components/students/students-page/students-page.component";
import { StudentsFormComponent } from "../../components/students/students-form/students-form.component";
import { NotFoundComponent } from "../../components/misc/not-found/not-found.component";

export const studentsRoutes: Routes = [
  {
    path: "add",
    component: StudentsFormComponent,
    data: { breadcrumb: "Add student"},
  },
  {
    path: "",
    pathMatch: "full",
    component: StudentsPageComponent,
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];
