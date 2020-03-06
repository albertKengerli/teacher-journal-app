import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./root/app.component";
import { AppRoutingModule } from "./app-routing.module";

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
    HttpClientModule,
    SharedModule,
    StudentsModule,
    SubjectsModule,
    StatisticsModule,
    ExportModule,
    MiscModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
