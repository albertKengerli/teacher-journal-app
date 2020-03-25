import { Directive, ElementRef, HostListener, Input, Renderer2, OnInit } from "@angular/core";

import { Colors } from "../constants/colors";

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

  private chooseColor(grade: number): string {
    if (grade < 0 && grade > 10) {
      return null;
    }

    if (grade < 5) {
      return Colors.NegativeColor;
    } else if (grade >= 5) {
      return Colors.PositiveColor;
    } else {
      return null;
    }
  }

  private highlightGrade(newGrade?: number): void {
    const currentGrade: number = newGrade || this.initialGrade;
    const color: string = this.chooseColor(currentGrade);

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
