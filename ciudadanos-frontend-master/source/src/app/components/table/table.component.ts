import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TokenStorageService } from '@modules/auth/token-storage.service';
import { SpinnerService } from '../spinner/spinner.service';
import { PaginationService } from '@shared/services/pagination.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  title: string = 'Cursos';
  @Input() bodyData: any[] = [];
  @Input() currentPage: number;
  @Input() isAction: boolean = false;
  @Output() action = new EventEmitter<any>();
  currentSearchTerm: string = '';

  constructor(
    private router: Router,
    private tokenService: TokenStorageService,
    private paginationService: PaginationService
  ) {}

  goToInscriptionPage(body: any) {
    this.tokenService.saveTableInformation(body);
    this.router.navigate(['inscripcion', body.id]);
  }

  ngOnInit(): void {}

  onSearch(searchTerm: string) {
    this.paginationService.sendSearchEvent(searchTerm);
  }

  onInputKeyUp(event: KeyboardEvent) {
    const searchTerm = (event.target as HTMLInputElement).value;
    if (event.key === 'Enter' || searchTerm === '') {
      this.paginationService.sendSearchEvent(searchTerm);
    }
  }

  onInputChanged(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    if (inputValue === '') {
      this.paginationService.sendSearchEvent('');
    }
  }
}
