/* tslint:disable */

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";

import { entitiesNames } from "../../constants/entitiesNames";

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let requestAim: string;

    if (req.url.includes(entitiesNames.students)) {
      requestAim = entitiesNames.students;
    } else if (req.url.includes(entitiesNames.subjects)) {
      requestAim = entitiesNames.subjects;
    } else if (req.url.includes(entitiesNames.grades)) {
      requestAim = entitiesNames.grades;
    } else {
      requestAim = "Unknown";
    }

    const modifiedReq: HttpRequest<any> = req.clone({
      setHeaders: {
        requestAim,
      },
    });

    return next.handle(modifiedReq);
  }
}
