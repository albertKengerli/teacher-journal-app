import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { StatisticsPageComponent } from "./components/statistics/statistics-page/statistics-page.component";
import { ExportPageComponent } from "./components/export/export-page/export-page.component";
import { NotFoundComponent } from "./components/misc/not-found/not-found.component";

const routes: Routes = [
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
