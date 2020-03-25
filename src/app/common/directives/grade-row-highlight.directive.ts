import { Directive, ElementRef, HostListener, Input, Renderer2, OnInit } from "@angular/core";

import { Colors } from "../constants/colors";
import * as GradeFunctions from "../helpers/gradeFunctions";

@Directive({
  selector: "[appGradeRowHighlight]"
})
export class GradeRowHighlightDirective implements OnInit {
  @Input() private averageGrade: number;
  private parentNode: Node;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
  ) { }

  private highlightRow(): void {
    const color: string = GradeFunctions.getColorForGrade(this.averageGrade);

    this.renderer.setStyle(this.parentNode, "backgroundColor", color);
  }

  private dehighlightRow(): void {
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
