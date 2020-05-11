import { TestBed } from "@angular/core/testing";

import { SubjectTableDatesService } from "./subject-table-dates.service";

describe("SubjectTableDatesService", () => {
  let service: SubjectTableDatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectTableDatesService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
