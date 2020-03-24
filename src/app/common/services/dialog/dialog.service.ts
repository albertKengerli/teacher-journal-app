import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root"
})
export class DialogService {
  constructor(private translateService: TranslateService) { }

  public confirmAction(message?: string): Observable<boolean> {
    const confirmation: boolean = window.confirm(message || this.translateService.instant("DIALOG.DEFAULT"));

    return of(confirmation);
  }
}
