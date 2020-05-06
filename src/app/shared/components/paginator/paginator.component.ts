import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectionStrategy } from "@angular/core";

import { PaginatorSelection } from "./paginator.model";

@Component({
  selector: "app-paginator",
  templateUrl: "./paginator.component.html",
  styleUrls: ["./paginator.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent implements OnInit {
  @Input() public paginationStep: number;
  @Input() public paginationSize: number;

  @Output() public paginationChange: EventEmitter<PaginatorSelection> = new EventEmitter();

  public paginatorSelection: PaginatorSelection = {
    start: null,
    end: null,
  };

  private initPaginator(): void {
    this.paginatorSelection.start = 0;

    if (this.paginationStep > this.paginationSize) {
      this.paginatorSelection.end = this.paginationSize;
    } else {
      this.paginatorSelection.end = this.paginationStep;
    }

    this.paginationChange.emit(this.paginatorSelection);
  }

  public ngOnInit(): void {
    this.initPaginator();
  }

  public showPrevious(): void {
    if (this.paginatorSelection.start === 0) {
      return;
    }

    this.paginatorSelection.start -= this.paginationStep;
    this.paginatorSelection.end -= this.paginationStep;

    this.paginationChange.emit(this.paginatorSelection);
  }

  public showNext(): void {
    if (this.paginatorSelection.start + this.paginationStep >= this.paginationSize) {
      return;
    }
    this.paginatorSelection.start += this.paginationStep;
    this.paginatorSelection.end += this.paginationStep;

    this.paginationChange.emit(this.paginatorSelection);
  }
}
