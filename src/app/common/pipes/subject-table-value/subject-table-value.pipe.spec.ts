import { SubjectTableValuePipe } from "./subject-table-value.pipe";

describe("SubjectTableValuePipe", () => {
  it("create an instance", () => {
    const pipe: SubjectTableValuePipe = new SubjectTableValuePipe();
    expect(pipe).toBeTruthy();
  });
});
