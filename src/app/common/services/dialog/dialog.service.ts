import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DialogService {

  public confirmAction(message?: string): Observable<boolean> {
    const confirmation: boolean = window.confirm(message || "Is it OK?");

    return of(confirmation);
  }
}
