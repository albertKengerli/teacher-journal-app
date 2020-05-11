import { TestBed } from "@angular/core/testing";

import { SubjectTableGradesService } from "./subject-table-grades.service";

describe("SubjectTableGradesService", () => {
  let service: SubjectTableGradesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectTableGradesService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
