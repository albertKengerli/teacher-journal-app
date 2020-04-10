import { Component, Input } from "@angular/core";
import { DatePipe } from "@angular/common";

import { MAT_CHECKBOX_CLICK_ACTION } from "@angular/material/checkbox";

import { DropdownEntity, DropdownSubgroup } from "../../../common/entities/dropdown";

@Component({
  selector: "app-dropdown-picker",
  templateUrl: "./dropdown-picker.component.html",
  styleUrls: ["./dropdown-picker.component.scss"],
  providers: [
    {
      provide: MAT_CHECKBOX_CLICK_ACTION,
      useValue: "noop"
    }
  ]
})
export class DropdownPickerComponent {
  @Input()public dropdownData: DropdownEntity[];

  public dropdownOpened: boolean = false;
  public test: string = "Your chosen dates";

  constructor(private datePipe: DatePipe) { }

  get value(): number[] {
    let result: number[] = [];

    this.dropdownData?.forEach(group => {
      const selectedSubgroups: number[] = group.subgroups.reduce(
        (acc, subgroup) => {
          if (subgroup.selected) {
            acc.push(subgroup.value);
          }
          return acc;
        },
        []
      );
      result = [...result, ...selectedSubgroups];
    });

    return result;
  }

  private getGroupBySubjectId(subjectId: number): DropdownEntity {
    return this.dropdownData.find(dropdownElement => dropdownElement.subject.id === subjectId);
  }

  private getSubgroup(subjectId: number, value: number): DropdownSubgroup {
    const currentGroup: DropdownEntity = this.getGroupBySubjectId(subjectId);
    return currentGroup.subgroups.find(subgroup => subgroup.value === value);
  }

  public toggleDropdown(): void {
    this.dropdownOpened = !this.dropdownOpened;
  }

  public setGroupOpeness(subjectId: number, value: boolean): void {
    const groupToSet: DropdownEntity = this.getGroupBySubjectId(subjectId);
    groupToSet.opened = value;
  }

  public setAllOpeness(value: boolean): void {
    this.dropdownData.forEach(dropdownElement => dropdownElement.opened = value);
  }

  public setGroupSelection(subjectId: number, value: boolean): void {
    const groupToSet: DropdownEntity = this.getGroupBySubjectId(subjectId);

    groupToSet.selected = value;
    groupToSet.partlySelected = false;
    groupToSet.subgroups.forEach(subgroup => subgroup.selected = value);
  }

  public setAllSelection(value: boolean): void {
    this.dropdownData.forEach(dropdownEntity => this.setGroupSelection(dropdownEntity.subject.id, value));
  }

  public setSubgroupSelection(subjectId: number, subgroupValue: number, value: boolean): void {
    const currentSubgroup: DropdownSubgroup = this.getSubgroup(subjectId, subgroupValue);
    currentSubgroup.selected = value;
  }

  public getTextOutput(): string[] {
    return this.value.map(numberValue => this.datePipe.transform(numberValue, "dd/LL/yyyy"));
  }

  public debug(): void {
    console.log(this);
  }
}
