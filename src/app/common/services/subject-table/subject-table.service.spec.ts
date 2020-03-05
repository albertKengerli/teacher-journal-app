import { TestBed } from "@angular/core/testing";

import { SubjectTableService } from "./subject-table.service";

describe("SubjectTableService", () => {
  let service: SubjectTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectTableService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
