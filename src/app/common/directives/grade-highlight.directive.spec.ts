/* tslint:disable */
import { ElementRef, Renderer2 } from "@angular/core";
import { GradeHighlightDirective } from "./grade-highlight.directive";

describe('GradeHighlightDirective', () => {
  it('should create an instance', () => {
    const directive = new GradeHighlightDirective(null as ElementRef, null as Renderer2);
    expect(directive).toBeTruthy();
  });
});
