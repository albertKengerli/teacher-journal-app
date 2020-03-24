import { Directive, ElementRef, HostListener, Input, Renderer2, OnInit } from "@angular/core";

import { Colors } from "../constants/colors";

@Directive({
  selector: "[appGradeRowHighlight]"
})
export class GradeRowHighlightDirective implements OnInit {
  @Input() private averageGrade: string;
  private parentNode: Node;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
  ) { }

  private highlightRow(): void {
    let color: string = "";

    if (+this.averageGrade > 5) {
      color = Colors.PositiveColor;
    } else {
      color = Colors.NegativeColor;
    }

    this.renderer.setStyle(this.parentNode, "backgroundColor", color);
  }

  private dehighlightRow(): void {
    /* tslint:disable-next-line:no-null-keyword*/
    this.renderer.setStyle(this.parentNode, "backgroundColor", null);
  }

  @HostListener("mouseenter")
    public onMouseEnter(): void {
      this.highlightRow();
    }

  @HostListener("mouseleave")
    public onMouseLeave(): void {
      this.dehighlightRow();
      }

  public ngOnInit(): void {
    this.parentNode = this.renderer.parentNode(this.element.nativeElement);
  }
}
