import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { StudentsPageComponent } from "../../components/students/students-page/students-page.component";
import { StudentsFormComponent } from "../../components/students/students-form/students-form.component";
import { StudentsRootComponent } from "../../components/students/students-root/students-root.component";

const studentsRoutes: Routes = [
  {
    path: "students",
    component: StudentsRootComponent,
    data: { breadcrumb: "STUDENTS" },
    children: [
      {
        path: "",
        component: StudentsPageComponent,
      },
      {
        path: "add",
        component: StudentsFormComponent,
        data: { breadcrumb: "ADD_STUDENT" },
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(studentsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class StudentsRoutingModule { }
