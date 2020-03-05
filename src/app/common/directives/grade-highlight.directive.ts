import { Directive, ElementRef, HostListener, Input, Renderer2, OnInit } from "@angular/core";

@Directive({
  selector: "[appGradeHighlight]"
})
export class GradeHighlightDirective implements OnInit {
  @Input() private averageGrade: string;
  private parentNode: Node;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
  ) { }

  @HostListener("mouseenter")
    private onMouseEnter(): void {
      if (+this.averageGrade < 5) {
        this.highlight("blue");
      } else {
        this.highlight("green");
      }
    }

  @HostListener("mouseleave")
    private onMouseLeave(): void {
      /* tslint:disable-next-line:no-null-keyword*/
      this.highlight(null);
    }

  private highlight(color: string): void {
      this.renderer.setStyle(this.parentNode, "backgroundColor", color);
  }

  public ngOnInit(): void {
    this.parentNode = this.renderer.parentNode(this.element.nativeElement);
  }
}
