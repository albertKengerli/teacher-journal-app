import { Component, OnInit, Input } from "@angular/core";

import { DropdownEntity } from "../../../common/entities/dropdown";

@Component({
  selector: "app-dropdown-picker",
  templateUrl: "./dropdown-picker.component.html",
  styleUrls: ["./dropdown-picker.component.scss"]
})
export class DropdownPickerComponent implements OnInit {
  @Input()public dropdownData: DropdownEntity[];

  public dropdownOpened: boolean = false;
  public test: string = "Your chosen dates";

  public ngOnInit(): void {
  }

  public toggleDropdown(): void {
    this.dropdownOpened = !this.dropdownOpened;
  }
}
