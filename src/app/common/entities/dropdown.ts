export interface DropdownGroup {
  groupName: string;
  subgroups: DropdownSubgroup[];
  opened: boolean;
  selected: boolean;
  partlySelected: boolean;
}

export interface DropdownSubgroup {
  value: string;
  selected: boolean;
}

export interface DropdownOutputEntity {
  groupName: string;
  selectedValues: string[];
}
