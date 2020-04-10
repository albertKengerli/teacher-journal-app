import { Subject } from "./subject";

export interface DropdownEntity {
  subject: Subject;
  subgroups: DropdownSubgroup[];
  opened: boolean;
  selected: boolean;
  partlySelected: boolean;
}

export interface DropdownSubgroup {
  value: number;
  selected: boolean;
}
