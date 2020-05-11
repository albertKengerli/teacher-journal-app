import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SubjectDetailsComponent } from "./subject-details.component";

describe("SubjectDetailsComponent", () => {
  let component: SubjectDetailsComponent;
  let fixture: ComponentFixture<SubjectDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render subject title in h2 tag", () => {
    const compiled: HTMLElement = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("h2").textContent).toContain(fixture.componentInstance.subject.name);
  });
});
