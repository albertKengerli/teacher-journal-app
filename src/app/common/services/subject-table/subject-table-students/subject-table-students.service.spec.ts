import { TestBed } from "@angular/core/testing";

import { SubjectTableStudentsService } from "./subject-table-students.service";

describe("SubjectTableService", () => {
  let service: SubjectTableStudentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectTableStudentsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
