import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";

@Injectable()
export class StudentsEffects {

  constructor(
    private actions: Actions
  ) {
    console.log("[STUDENTS EFFECTS]");
  }
}
