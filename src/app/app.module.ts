import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HttpClient } from "@angular/common/http";

import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { AppComponent } from "./root/app.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppStoreModule } from "./store/appStore.module";

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
    AppStoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: "en",
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, "../assets/locale/", ".json");
}
