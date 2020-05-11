import { TestBed } from "@angular/core/testing";

import { GradesSenderService } from "./grades-sender.service";
import { GradeOperations } from "../../constants/gradesConstants";

describe("GradeSenderService", () => {
  let service: GradesSenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GradesSenderService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should properly empty grades", () => {
    service.prepareGradeForSending(1, GradeOperations.Post);
    service.prepareGradeForSending(2, GradeOperations.Update);
    service.prepareGradeForSending(3, GradeOperations.Delete);

    service.emptyPreparedGrades();
    expect(service["gradesToSend"][GradeOperations.Delete].size).toEqual(0);
    expect(service["gradesToSend"][GradeOperations.Update].size).toEqual(0);
    expect(service["gradesToSend"][GradeOperations.Post].size).toEqual(0);
  });

  it("should leave only last operation for the same grade", () => {
    service.prepareGradeForSending(1, GradeOperations.Post);
    service.prepareGradeForSending(1, GradeOperations.Update);
    service.prepareGradeForSending(1, GradeOperations.Delete);

    expect(service["gradesToSend"][GradeOperations.Delete].has(1)).toBeTrue();
    expect(service["gradesToSend"][GradeOperations.Post].has(1)).toBeFalse();
    expect(service["gradesToSend"][GradeOperations.Update].has(1)).toBeFalse();
  });
});
