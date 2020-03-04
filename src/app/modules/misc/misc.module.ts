import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { BreadcrumbModule } from "angular-crumbs";

import { SharedModule } from "../../modules/shared/shared.module";

import { BreadcrumbsComponent } from "../../components/misc/breadcrumbs/breadcrumbs.component";
import { NotFoundComponent } from "../../components/misc/not-found/not-found.component";

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BreadcrumbModule,
    RouterModule,
  ],
  exports: [
    BreadcrumbsComponent,
    NotFoundComponent,
  ],
})
export class MiscModule { }
