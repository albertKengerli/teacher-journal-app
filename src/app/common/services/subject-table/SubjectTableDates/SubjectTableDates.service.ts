import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";
import { AppState } from "../../../../store";
import * as SubjectTableDataActions from "../../../../store/subjectTableData/subjectTableData.actions";

import { subjectTablePaginationStep } from "../../../../components/subjects/subject-table/subject-table.model";

@Injectable({
  providedIn: "root"
})
export class SubjectTableDatesService {

  constructor(
    private store: Store<AppState>,
  ) { }

  public addDates(dates: Date[]): void {
    this.store.dispatch(SubjectTableDataActions.addDates({ newDates: dates }));
    this.selectDates(0, subjectTablePaginationStep);
  }

  public selectDates(selectionStart: number, selectionEnd: number): void {
    this.store.dispatch(SubjectTableDataActions.selectDates({ selectionStart, selectionEnd }));
    this.store.dispatch(SubjectTableDataActions.setColumnNames());
  }

}
