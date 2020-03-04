import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SubjectsRootComponent } from "../../components/subjects/subjects-root/subjects-root.component";
import { SubjectsPageComponent } from "../../components/subjects/subjects-page/subjects-page.component";
import { SubjectFormComponent } from "../../components/subjects/subject-form/subject-form.component";
import { SubjectDetailsComponent } from "../../components/subjects/subject-details/subject-details.component";

const subjectsRoutes: Routes = [
  {
    path: "subjects",
    component: SubjectsRootComponent,
    data: { breadcrumb: "Subjects"},
    children: [
      {
        path: "",
        component: SubjectsPageComponent,
      },
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
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(subjectsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SubjectsRoutingModule { }
