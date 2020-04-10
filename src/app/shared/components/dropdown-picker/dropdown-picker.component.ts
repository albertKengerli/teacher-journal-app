import { Component, Input } from "@angular/core";

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

  private getGroupBySubjectId(groupName: string): DropdownEntity {
    return this.dropdownData.find(dropdownElement => dropdownElement.groupName === groupName);
  }

  private getSubgroup(groupName: string, subgroupValue: string): DropdownSubgroup {
    const currentGroup: DropdownEntity = this.getGroupBySubjectId(groupName);
    return currentGroup.subgroups.find(subgroup => subgroup.value === subgroupValue);
  }

  public toggleDropdown(): void {
    this.dropdownOpened = !this.dropdownOpened;
  }

  public setGroupOpeness(groupName: string, value: boolean): void {
    const groupToSet: DropdownEntity = this.getGroupBySubjectId(groupName);
    groupToSet.opened = value;
  }

  public setAllOpeness(value: boolean): void {
    this.dropdownData.forEach(dropdownElement => dropdownElement.opened = value);
  }

  public setGroupSelection(groupName: string, value: boolean): void {
    const groupToSet: DropdownEntity = this.getGroupBySubjectId(groupName);

    groupToSet.selected = value;
    groupToSet.partlySelected = false;
    groupToSet.subgroups.forEach(subgroup => subgroup.selected = value);
  }

  public setAllSelection(value: boolean): void {
    this.dropdownData.forEach(dropdownEntity => this.setGroupSelection(dropdownEntity.groupName, value));
  }

  public setSubgroupSelection(groupName: string, subgroupValue: string, value: boolean): void {
    const currentSubgroup: DropdownSubgroup = this.getSubgroup(groupName, subgroupValue);
    currentSubgroup.selected = value;
  }

  public debug(): void {
    console.log(this);
  }
}
