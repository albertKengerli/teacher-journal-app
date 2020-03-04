import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { StatisticsPageComponent } from "./components/statistics/statistics-page/statistics-page.component";
import { ExportPageComponent } from "./components/export/export-page/export-page.component";
import { StudentsRootComponent } from "./components/students/students-root/students-root.component";
import { SubjectsRootComponent } from "./components/subjects/subjects-root/subjects-root.component";
import { NotFoundComponent } from "./components/misc/not-found/not-found.component";

import { studentsRoutes } from "./modules/students/students.routes";
import { subjectsRoutes } from "./modules/subjects/subjects.routes";

const routes: Routes = [
  {
    path: "students",
    component: StudentsRootComponent,
    data: { breadcrumb: "Students"},
    children: studentsRoutes,
  },
  {
    path: "subjects",
    component: SubjectsRootComponent,
    data: { breadcrumb: "Subjects"},
    children: subjectsRoutes,
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
