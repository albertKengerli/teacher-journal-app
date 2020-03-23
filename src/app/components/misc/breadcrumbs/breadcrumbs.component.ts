import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-breadcrumbs",
  templateUrl: "./breadcrumbs.component.html",
  styleUrls: ["./breadcrumbs.component.scss"]
})
export class BreadcrumbsComponent {
  constructor(private translateService: TranslateService) { }

  public translateBreadcrumb(breadcrumb: string): string {
    return this.translateService.instant(`BREADCRUMBS.${breadcrumb}`);
  }
}
