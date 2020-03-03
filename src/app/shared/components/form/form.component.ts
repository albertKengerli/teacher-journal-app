import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
import { Location } from "@angular/common";

import { FormControl, FormGroup, Validators, ValidatorFn } from "@angular/forms";

import { Field } from "../../../common/entities/field";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"]
})
export class FormComponent implements OnInit {
  @Input() public config: Field[];
  @Output() public onAdd: EventEmitter<Object> = new EventEmitter<Object>();

  public formGroup: FormGroup;

  constructor(private location: Location) {}

  private formControlInit(): void {
    this.formGroup = new FormGroup({});
    for (let i: number = 0; i < this.config.length; i++) {
      let currentConfig: Field = this.config[i];
      const validators: ValidatorFn[] = [];

      if (currentConfig.required) {
        validators.push(Validators.required);
      }

      if (currentConfig.validation) {
        validators.push(Validators.pattern(currentConfig.expression));
      }

      this.formGroup.addControl(
        currentConfig.name,
        new FormControl("", validators)
      );
    }
  }

  public ngOnInit(): void {
    this.formControlInit();
  }

  public submit(): void {
    this.onAdd.emit(this.formGroup.value);
    this.location.back();
  }

  public goBack(): void {
    this.location.back();
  }
}
