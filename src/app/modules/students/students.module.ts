import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../shared/shared.module";

import { StudentsRootComponent } from "../../components/students/students-root/students-root.component";
import { StudentsPageComponent } from "../../components/students/students-page/students-page.component";
import { StudentsTableComponent } from "../../components/students/students-table/students-table.component";
import { StudentsFormComponent } from "../../components/students/students-form/students-form.component";

import { StudentsRoutingModule } from "./students-routing.module";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { studentsReducer, StudentsEffects } from "../../store/students";

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
    StudentsRoutingModule,
    StoreModule.forFeature("students", studentsReducer),
    EffectsModule.forFeature([StudentsEffects]),
  ]
})
export class StudentsModule { }
