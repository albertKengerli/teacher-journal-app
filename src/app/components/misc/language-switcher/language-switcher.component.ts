import { Component } from "@angular/core";

import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-language-switcher",
  templateUrl: "./language-switcher.component.html",
  styleUrls: ["./language-switcher.component.scss"]
})
export class LanguageSwitcherComponent {
  constructor(private translateService: TranslateService) {}

  public isLanguageActive(language: string): boolean {
    if (!this.translateService.currentLang) {
      return this.translateService.defaultLang === language;
    } else {
      return this.translateService.currentLang === language;
    }
  }

  public setLanguage(language: string): void {
    this.translateService.use(language);
  }
}
