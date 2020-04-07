import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../shared/shared.module";

import { StatisticsPageComponent } from "../../components/statistics/statistics-page/statistics-page.component";
import { DropdownPickerComponent } from "../../components/statistics/dropdown-picker/dropdown-picker.component";

@NgModule({
  declarations: [
    StatisticsPageComponent,
    DropdownPickerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class StatisticsModule { }
