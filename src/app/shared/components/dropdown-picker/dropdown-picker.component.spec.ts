import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DropdownPickerComponent } from "./dropdown-picker.component";

describe("DropdownPickerComponent", () => {
  let component: DropdownPickerComponent;
  let fixture: ComponentFixture<DropdownPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
