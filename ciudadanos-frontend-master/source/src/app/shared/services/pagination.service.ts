import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Instancia } from '../models/instancias';
import { TokenStorageService } from '@modules/auth/token-storage.service';
import { InstanciaSedeService } from './instanciaSede.service';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  public listFiltered: Array<Instancia> = [];
  public originalData: any[] = [];
  public currentSearchTerm: string = '';
  public itemsPerPage: number = 5;
  public allPages: number = 0;
  public currentPage: number = 1;
  private searchEvent = new Subject<string>();
  searchEvent$ = this.searchEvent.asObservable();

  constructor(
    private tokenService: TokenStorageService,
    private instanciaSedeService: InstanciaSedeService
  ) {}

  sendSearchEvent(searchTerm: string) {
    this.searchEvent.next(searchTerm);
  }

  defineDays(item) {
    let daysOfWeek = [
      'lunes',
      'martes',
      'miercoles',
      'jueves',
      'viernes',
      'sabado',
      'domingo',
    ];

    const diasSeleccionadosArr = Object.keys(item).filter(
      (dia) => daysOfWeek.includes(dia) && item[dia] === 1
    );

    if (diasSeleccionadosArr.length === 7) {
      return 'Todos los días';
    } else {
      return diasSeleccionadosArr.join(', ');
    }
  }

  onInputKeyUp(event: KeyboardEvent) {
    const searchTerm = (event.target as HTMLInputElement).value;
    if (event.key === 'Enter' || searchTerm === '') {
      this.currentSearchTerm = searchTerm;
      this.getInscripciones(0, searchTerm);
      this.currentPage = 1;
    }
  }

  onInputChanged(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    if (inputValue === '') {
      this.currentSearchTerm = '';
      this.getInscripciones(0, '');
      this.currentPage = 1;
    }
  }

  getInscripciones(page: number, busqueda) {
    const codeInscription = Number(this.tokenService.getCodeInscription());
    if (this.tokenService.getJwtToken === null) {
      var token = this.tokenService.getToken();
    } else {
      var token = this.tokenService.getJwtToken();
    }
    this.instanciaSedeService
      .getInstanciaSedeByBusqueda(
        codeInscription,
        page,
        this.itemsPerPage,
        busqueda,
        token
      )
      .subscribe((response) => {
        this.originalData = response.content;
        this.originalData.forEach((row) => {
          row.dias = this.defineDays(row);
        });
        this.listFiltered = this.originalData;
        this.allPages = response.totalPages;
      });
  }
}
