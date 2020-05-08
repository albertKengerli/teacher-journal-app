import { Directive, ElementRef, HostListener, Input, Renderer2, OnInit } from "@angular/core";

import * as GradeUtility from "../helpers/GradeUtility";

@Directive({
  selector: "[appGradeHighlight]"
})
export class GradeHighlightDirective implements OnInit {
  @Input() private initialGrade: number;
  private node: HTMLElement;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
  ) { }

  private getCurrentGrade(newGrade: number): number {
    if (newGrade === undefined) {
      return this.initialGrade;
    } else {
      return newGrade;
    }
  }
  private highlightGrade(newGrade?: number): void {
    const currentGrade: number = this.getCurrentGrade(newGrade);

    if (isNaN(currentGrade) || !GradeUtility.isGradeValid(currentGrade)) {
      return;
    }

    const color: string = GradeUtility.getColorForGrade(currentGrade);

    this.renderer.setStyle(this.node, "borderBottom", `solid 10px ${color}`);
  }

  @HostListener("blur")
    public onBlur(): void {
      this.highlightGrade(parseInt(this.node.innerText, 10));
    }

  public ngOnInit(): void {
    this.node = this.element.nativeElement;
    this.highlightGrade();
  }
}
