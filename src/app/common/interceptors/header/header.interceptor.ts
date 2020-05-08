import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";

import { EntitiesNames } from "../../constants/entitiesNames";

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let requestAim: string;

    if (req.url.includes(EntitiesNames.Students)) {
      requestAim = EntitiesNames.Students;
    } else if (req.url.includes(EntitiesNames.Subjects)) {
      requestAim = EntitiesNames.Subjects;
    } else if (req.url.includes(EntitiesNames.Grades)) {
      requestAim = EntitiesNames.Grades;
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
