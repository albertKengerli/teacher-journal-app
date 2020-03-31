import { TestBed } from "@angular/core/testing";

import { GradesSenderService } from "./grades-sender.service";

describe("GradeSenderService", () => {
  let service: GradesSenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GradesSenderService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
