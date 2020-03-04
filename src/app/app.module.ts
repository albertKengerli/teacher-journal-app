import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./root/app.component";

import { SharedModule } from "./modules/shared/shared.module";
import { StudentsModule } from "./modules/students/students.module";
import { SubjectsModule } from "./modules/subjects/subjects.module";
import { StatisticsModule } from "./modules/statistics/statistics.module";
import { ExportModule } from "./modules/export/export.module";
import { MiscModule } from "./modules/misc/misc.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    StudentsModule,
    SubjectsModule,
    StatisticsModule,
    ExportModule,
    MiscModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
