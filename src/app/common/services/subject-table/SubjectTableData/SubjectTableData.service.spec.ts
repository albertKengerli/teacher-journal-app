import { TestBed } from "@angular/core/testing";

import { SubjectTableDataService } from "./SubjectTableData.service";

describe("SubjectTableService", () => {
  let service: SubjectTableDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectTableDataService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
