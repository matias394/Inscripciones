import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '@modules/auth/token-storage.service';
import { PaginationService } from '@shared/services/pagination.service';

@Component({
  selector: 'card-inscripciones',
  templateUrl: './card-inscripciones.component.html',
  styleUrls: ['./card-inscripciones.component.css'],
})
export class CardInscripcionesComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() messageButton: string;
  @Input() isAction: boolean = false;
  @Output() action = new EventEmitter<any>();
  searchValue: string = '';
  currentSearchTerm: string = '';

  constructor(
    private tokenService: TokenStorageService,
    private router: Router,
    private paginationService: PaginationService
  ) {}

  ngOnInit() {}

  ngDestroy() {}

  goToInscriptionPage(body: any) {
    this.tokenService.saveTableInformation(body);
    console.log(new Date(),'*** Body: ', body)
    this.router.navigate(['inscripcion', body.id]);
  }

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
