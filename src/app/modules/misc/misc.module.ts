import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { BreadcrumbModule } from "angular-crumbs";

import { SharedModule } from "../../modules/shared/shared.module";

import { BreadcrumbsComponent } from "../../components/misc/breadcrumbs/breadcrumbs.component";
import { NotFoundComponent } from "../../components/misc/not-found/not-found.component";
import { LanguageSwitcherComponent } from "../../components/misc/language-switcher/language-switcher.component";

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    NotFoundComponent,
    LanguageSwitcherComponent,
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
    LanguageSwitcherComponent,
  ],
})
export class MiscModule { }
