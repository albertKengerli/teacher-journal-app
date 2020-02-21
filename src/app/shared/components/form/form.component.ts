import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';

import { Field } from '../../../common/entities/field';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() config: Field[];
  @Output() onAdd = new EventEmitter<Object>();

  formGroup: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.formControlInit();
  }

  formControlInit(): void {
    this.formGroup = new FormGroup({});
    for (let i = 0; i < this.config.length; i++) {
      let currentConfig = this.config[i];
      const validators: ValidatorFn[] = [];

      if (currentConfig.required) {
        validators.push(Validators.required);
      }

      if (currentConfig.validation) {
        validators.push(Validators.pattern(currentConfig.expression));
      }

      this.formGroup.addControl(
        currentConfig.name,
        new FormControl('', validators)
      );
    }
  }

  onSubmit(): boolean {
    this.onAdd.emit(this.formGroup.value);
    return true;
  }

}
