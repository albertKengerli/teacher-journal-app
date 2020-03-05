import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[appGradeHighlight]"
})
export class GradeHighlightDirective {
  @Input() private averageGrade: string;

  constructor(private element: ElementRef) { }

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
      this.element.nativeElement.parentNode.style.backgroundColor = color;
  }
}
