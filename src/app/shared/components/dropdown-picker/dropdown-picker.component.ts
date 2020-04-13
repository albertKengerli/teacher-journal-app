import { Component, Input, forwardRef } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

import { MAT_CHECKBOX_CLICK_ACTION } from "@angular/material/checkbox";

import { DropdownGroup, DropdownSubgroup, DropdownOutputEntity } from "../../../common/entities/dropdown";

@Component({
  selector: "app-dropdown-picker",
  templateUrl: "./dropdown-picker.component.html",
  styleUrls: ["./dropdown-picker.component.scss"],
  providers: [
    {
      provide: MAT_CHECKBOX_CLICK_ACTION,
      useValue: "noop"
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownPickerComponent),
      multi: true
    }
  ]
})
export class DropdownPickerComponent implements ControlValueAccessor {
  @Input()public dropdownData: DropdownGroup[];

  public dropdownOpened: boolean = false;

  get value(): DropdownOutputEntity[] {
    return this.dropdownData?.reduce(
      (groupAcc, currentGroup) => {
        const currentGroupName: string = currentGroup.groupName;
        const currentGroupSelectedValues: string[] = this.getSelectedValuesFromGroup(currentGroup);

        groupAcc.push({
          groupName: currentGroupName,
          selectedValues: currentGroupSelectedValues,
        });

        return groupAcc;
      },
      [],
    );
  }

  get stringValue(): string[] {
    return this.dropdownData?.reduce(
      (groupAcc, currentGroup) => {
        const currentGroupSelectedValues: string[] = this.getSelectedValuesFromGroup(currentGroup);

        groupAcc = [...groupAcc, ...currentGroupSelectedValues];
        return groupAcc;
      },
      [],
    );
  }

  private getGroup(groupName: string): DropdownGroup {
    return this.dropdownData.find(dropdownElement => dropdownElement.groupName === groupName);
  }

  private getSubgroup(groupName: string, subgroupValue: string): DropdownSubgroup {
    const currentGroup: DropdownGroup = this.getGroup(groupName);
    return currentGroup.subgroups.find(subgroup => subgroup.value === subgroupValue);
  }

  private getSelectedValuesFromGroup(group: DropdownGroup): string[] {
    return group.subgroups.reduce(
      (acc, currentSubgroup) => {
        if (currentSubgroup.selected) {
          acc.push(currentSubgroup.value);
        }

        return acc;
      },
      []
    );
  }

  public onChange = (dropdownOutput: DropdownOutputEntity[]) => {
    return;
  }

  public onTouched = () => {
    return;
  }

  public toggleDropdown(): void {
    this.dropdownOpened = !this.dropdownOpened;
  }

  public setGroupOpeness(groupName: string, value: boolean): void {
    const groupToSet: DropdownGroup = this.getGroup(groupName);
    groupToSet.opened = value;
  }

  public setAllOpeness(value: boolean): void {
    this.dropdownData.forEach(dropdownElement => dropdownElement.opened = value);
  }

  public setGroupSelection(groupName: string, value: boolean): void {
    const groupToSet: DropdownGroup = this.getGroup(groupName);

    groupToSet.selected = value;
    groupToSet.partlySelected = false;
    groupToSet.subgroups.forEach(subgroup => subgroup.selected = value);

    this.writeValue(this.value);
  }

  public setAllSelection(value: boolean): void {
    this.dropdownData.forEach(dropdownEntity => this.setGroupSelection(dropdownEntity.groupName, value));
    this.writeValue(this.value);
  }

  public setSubgroupSelection(groupName: string, subgroupValue: string, value: boolean): void {
    const currentSubgroup: DropdownSubgroup = this.getSubgroup(groupName, subgroupValue);
    currentSubgroup.selected = value;

    this.writeValue(this.value);
  }

  public writeValue(newValue: DropdownOutputEntity[]): void {
    newValue?.forEach(outputEntity => {
      const currentGroup: DropdownGroup = this.getGroup(outputEntity.groupName);

      currentGroup.subgroups.forEach(subgroup => {
        if (outputEntity.selectedValues.includes(subgroup.value)) {
          subgroup.selected = true;
        } else {
          subgroup.selected = false;
        }
      });
    });
    this.onChange(this.value);
  }

  public registerOnChange(fn: (dropdownOutput: DropdownOutputEntity[]) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
