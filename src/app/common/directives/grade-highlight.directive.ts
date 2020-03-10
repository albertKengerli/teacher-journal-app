import { Directive, ElementRef, HostListener, Input, Renderer2, OnInit } from "@angular/core";

@Directive({
  selector: "[appGradeHighlight]"
})
export class GradeHighlightDirective implements OnInit {
  @Input() private grade: string;
  private node: HTMLElement;
  private positiveColor: string = "#388e3c";
  private negativeColor: string = "#5472d3";

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
  ) { }

  @HostListener("blur")
    private onBlur(): void {
      this.highlightGrade(this.node.innerText);
    }

  private highlightGrade(grade?: string): void {
    let color: string;
    let currentGrade: string;
    if (grade === undefined) {
      currentGrade = this.grade;
    } else {
      currentGrade = grade;
    }

    if (currentGrade === "") {
      return this.dehighlight();
    }

    if (isNaN(+currentGrade) || +currentGrade > 10 || +currentGrade <= 0) {
      return;
    } else if (+currentGrade < 5) {
      color = this.negativeColor;
    } else {
      color = this.positiveColor;
    }

    this.renderer.setStyle(this.node, "backgroundColor", color);
  }

  private dehighlight(): void {
    this.renderer.setStyle(this.node, "backgroundColor", null);
  }

  public ngOnInit(): void {
    this.node = this.element.nativeElement;
    this.highlightGrade();
  }
}
