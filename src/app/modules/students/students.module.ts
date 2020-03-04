import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../shared/shared.module";

import { StudentsRootComponent } from "../../components/students/students-root/students-root.component";
import { StudentsPageComponent } from "../../components/students/students-page/students-page.component";
import { StudentsTableComponent } from "../../components/students/students-table/students-table.component";
import { StudentsFormComponent } from "../../components/students/students-form/students-form.component";

@NgModule({
  declarations: [
    StudentsRootComponent,
    StudentsPageComponent,
    StudentsTableComponent,
    StudentsFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class StudentsModule { }
