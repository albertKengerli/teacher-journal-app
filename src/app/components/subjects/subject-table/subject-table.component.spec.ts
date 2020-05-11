import { async, ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import { SubjectTableComponent } from "./subject-table.component";

describe("SubjectTableComponent", () => {
  let component: SubjectTableComponent;
  let fixture: ComponentFixture<SubjectTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call proper method on table cell focus", fakeAsync(() => {
    spyOn(component, "saveEditingCell");

    const cell: HTMLElement = fixture.debugElement.nativeElement.querySelector(By.css(".subjectsTable-gradeText"));

    cell.focus();
    tick();
    expect(component.saveEditingCell).toHaveBeenCalled();
  }));
});
