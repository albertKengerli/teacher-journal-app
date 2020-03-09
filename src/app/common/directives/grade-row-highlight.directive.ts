import { Directive, ElementRef, HostListener, Input, Renderer2, OnInit } from "@angular/core";

@Directive({
  selector: "[appGradeRowHighlight]"
})
export class GradeRowHighlightDirective implements OnInit {
  @Input() private averageGrade: string;
  private parentNode: Node;
  private positiveColor: string = "#388e3c";
  private negativeColor: string = "#5472d3";

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
  ) { }

  @HostListener("mouseenter")
    private onMouseEnter(): void {
      this.highlightRow();
    }

  @HostListener("mouseleave")
    private onMouseLeave(): void {
      this.dehighlightRow();
    }

  private highlightRow(): void {
    let color: string = "";

    if (+this.averageGrade < 5) {
      color = this.positiveColor;
    } else {
      color = this.negativeColor;
    }

    this.renderer.setStyle(this.parentNode, "backgroundColor", color);
  }

  private dehighlightRow(): void {
    /* tslint:disable-next-line:no-null-keyword*/
    this.renderer.setStyle(this.parentNode, "backgroundColor", null);
  }

  public ngOnInit(): void {
    this.parentNode = this.renderer.parentNode(this.element.nativeElement);
  }
}
