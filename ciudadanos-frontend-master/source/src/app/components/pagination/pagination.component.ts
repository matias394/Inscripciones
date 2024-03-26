import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  template: `
    <div class="d-flex justify-content-center">
      <div class="mt-5">
        <nav>
          <ul class="pagination">
            <li
              *ngIf="currentPage === 1"
              class="page-item"
              (click)="onFirstPage()"
            ></li>
            <li
              *ngIf="currentPage > 1"
              class="page-item"
              (click)="onPreviousPage()"
            >
              <span class="page-link">
                <span class="page-previous-icon" aria-hidden="true"></span>
                <span class="page-next-text">Anterior</span>
              </span>
            </li>
            <li class="page-item active" *ngIf="currentPage < allPagesNumber">
              <a class="page-link">
                {{ currentPage }}
              </a>
            </li>

            <li class="page-item">
              <a class="page-link" (click)="onLastPage()">{{
                allPagesNumber
              }}</a>
            </li>
            <li *ngIf="currentPage < allPagesNumber" class="page-item">
              <a class="page-link" (click)="onNextPage()">
                <span class="page-next-text">Siguiente</span>
                <span class="page-next-icon" aria-hidden="true"></span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  `,
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Input() itemsPerPage!: number;
  @Input() itemsNumber!: number;
  @Input() allPagesNumber!: number;
  @Input() _currentPage: number = 1;
  @Output() changePage: EventEmitter<number> = new EventEmitter<number>();
  @Output() rolesChangePage: EventEmitter<number> = new EventEmitter<number>();
  @Output() backToPageOne: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  get currentPage(): number {
    return this._currentPage;
  }

  set currentPage(page) {
    this._currentPage = page;
    this.changePage.emit(this.currentPage);
  }

  onFirstPage(): void {
    this.currentPage = 1;
  }

  onLastPage(): void {
    this.currentPage = this.allPagesNumber;
  }

  onNextPage(): void {
    this.currentPage += 1;
  }

  onPreviousPage(): void {
    this.currentPage -= 1;
  }
}
