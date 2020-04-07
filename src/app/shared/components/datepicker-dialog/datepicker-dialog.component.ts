import { Component, Inject } from "@angular/core";

import { FormControl } from "@angular/forms";

import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-datepicker-dialog",
  templateUrl: "./datepicker-dialog.component.html",
  styleUrls: ["./datepicker-dialog.component.scss"]
})
export class DatepickerDialogComponent {
  public datePickControl: FormControl = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<DatepickerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { dates: number[] },
  ) { }

  public filterExistingDates = (date: Date): boolean => {
    const dateAsNumber: number = date.getTime();
    return !this.data.dates.includes(dateAsNumber);
  }

  public cancelDialog(): void {
    this.dialogRef.close();
  }
}
