import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DialogService {

  public confirmLeaving(message?: string): Observable<boolean> {
    const confirmation: boolean = window.confirm(message || "Is it OK?");

    return of(confirmation);
  }
}
