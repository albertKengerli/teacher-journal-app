import { Component, OnInit, Input } from '@angular/core';

import { FormControl, FormGroup, FormArray } from '@angular/forms';

import { Field } from '../../../common/entities/field';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() config: Field[];

  formGroup: FormGroup;
  dataReady: boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.formControlInit();
  }

  formControlInit(): void {
    this.formGroup = new FormGroup({});
    for (let i = 0; i < this.config.length; i++) {
      let currentField: string = this.config[i].name;
      this.formGroup.addControl(
        this.config[i].name,
        new FormControl('')
      );
    }
  }

  onSubmit(): void {
  }

}
