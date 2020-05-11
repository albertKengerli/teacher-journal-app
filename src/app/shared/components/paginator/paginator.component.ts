import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectionStrategy, OnDestroy, OnChanges } from "@angular/core";

import { BehaviorSubject, Subscription, Subject } from "rxjs";

import { PaginatorSelection } from "./paginator.model";
import { div } from "../../../common/helpers/calculation";

@Component({
  selector: "app-paginator",
  templateUrl: "./paginator.component.html",
  styleUrls: ["./paginator.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent implements OnInit, OnChanges, OnDestroy {
  private currentPage$: BehaviorSubject<number> = new BehaviorSubject(0);
  private currentPageSubscription: Subscription;
  private resetPaginationSubscription: Subscription;
  private lastPage: number;

  @Input() public paginationStep: number;
  @Input() public paginationSize: number;
  @Input() public resetPaginationEvent$: Subject<void>;

  @Output() public paginationChange: EventEmitter<PaginatorSelection> = new EventEmitter();

  public paginatorSelection: PaginatorSelection = {
    start: null,
    end: null,
  };

  private calculateEndSelection(newEnd: number): number {
    if (newEnd > this.paginationSize) {
      return this.paginationSize;
    } else {
      return newEnd;
    }
  }

  private setLastPage(): void {
    const pagesQuantity: number = div(this.paginationSize, this.paginationStep) - 1;

    this.lastPage = this.paginationSize % this.paginationStep ?
      pagesQuantity + 1 :
      pagesQuantity;
  }

  private resetSelection(): void {
    this.currentPage$.next(0);
  }

  public ngOnInit(): void {
    this.currentPageSubscription = this.currentPage$.subscribe( page => {
        this.paginatorSelection.start = page * this.paginationStep;
        this.paginatorSelection.end = this.calculateEndSelection((page + 1) * this.paginationStep);

        this.paginationChange.emit(this.paginatorSelection);
      }
    );

    this.resetPaginationSubscription = this.resetPaginationEvent$.subscribe(() => this.resetSelection());
  }

  public ngOnChanges(): void {
    this.setLastPage();
  }

  public showPrevious(): void {
    if (this.currentPage$.value === 0) {
      return;
    }

    this.currentPage$.next(this.currentPage$.value - 1);
  }

  public showNext(): void {
    if (this.currentPage$.value === this.lastPage) {
      return;
    }

    this.currentPage$.next(this.currentPage$.value + 1);
  }

  public ngOnDestroy(): void {
    this.currentPageSubscription.unsubscribe();
    this.resetPaginationSubscription.unsubscribe();
  }
}
