import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../../modules/shared/shared.module";

import { ExportPageComponent } from "../../components/export/export-page/export-page.component";

@NgModule({
  declarations: [
    ExportPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class ExportModule { }
