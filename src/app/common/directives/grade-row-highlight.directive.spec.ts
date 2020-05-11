import { ElementRef, Renderer2 } from "@angular/core";
import { GradeRowHighlightDirective } from "./grade-row-highlight.directive";

describe("GradeRowHighlightDirective", () => {
  it("should create an instance", () => {
    const directive = new GradeRowHighlightDirective(null as ElementRef, null as Renderer2);
    expect(directive).toBeTruthy();
  });
});
