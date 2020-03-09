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
    let color: string = "";
    const currentGrade: string = grade || this.grade;

    if (!currentGrade) {
      /* tslint:disable-next-line:no-null-keyword*/
      return;
    } else if (+currentGrade < 5) {
      color = this.negativeColor;
    } else {
      color = this.positiveColor;
    }

    this.renderer.setStyle(this.node, "backgroundColor", color);
  }

  public ngOnInit(): void {
    this.node = this.element.nativeElement;
    this.highlightGrade();
  }
}
