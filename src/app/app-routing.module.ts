import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { StudentsPageComponent } from "./components/students/students-page/students-page.component";
import { SubjectsPageComponent } from "./components/subjects/subjects-page/subjects-page.component";
import { StudentsFormComponent } from "./components/students/students-form/students-form.component";
import { SubjectFormComponent } from "./components/subjects/subject-form/subject-form.component";
import { SubjectDetailsComponent } from "./components/subjects/subject-details/subject-details.component";
import { NotFoundComponent } from "./components/misc/not-found/not-found.component";
import { StatisticsPageComponent } from "./components/statistics/statistics-page/statistics-page.component";
import { ExportPageComponent } from "./components/export/export-page/export-page.component";
import { StudentsRootComponent } from "./components/students/students-root/students-root.component";
import { SubjectsRootComponent } from "./components/subjects/subjects-root/subjects-root.component";

const routes: Routes = [
  {
    path: "students",
    component: StudentsRootComponent,
    data: { breadcrumb: "Students"},
    children: [
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
    ],
  },
  {
    path: "subjects",
    component: SubjectsRootComponent,
    data: { breadcrumb: "Subjects"},
    children: [
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
      },
    ],
  },
  {
    path: "export",
    component: ExportPageComponent,
    data: { breadcrumb: "Export"},
  },
  {
    path: "statistics",
    component: StatisticsPageComponent,
    data: { breadcrumb: "Statistics"},
  },
  {
    path: "",
    redirectTo: "/students",
    pathMatch: "full",
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
