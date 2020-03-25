import { Directive, ElementRef, HostListener, Input, Renderer2, OnInit } from "@angular/core";

import { Colors } from "../constants/colors";
import * as GradeFunctions from "../helpers/gradeFunctions";

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

  private highlightGrade(newGrade?: number): void {
    const currentGrade: number = newGrade || this.initialGrade;

    if (!GradeFunctions.isGradeValid(currentGrade)) {
      return;
    }

    const color: string = GradeFunctions.getColorForGrade(currentGrade);

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
