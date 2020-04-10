export interface DropdownEntity {
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
