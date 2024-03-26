import { Subject } from 'rxjs';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '@modules/auth/token-storage.service';
import { InstanciaSedeService } from '@shared/services/instanciaSede.service';

@Component({
  selector: 'app-nueva-inscripcion',
  templateUrl: './nueva-inscripcion.component.html',
  styleUrls: ['./nueva-inscripcion.component.scss'],
})
export class NuevaInscripcionComponent {
  public tableData: any[] = [];
  public modalTitle: string = 'Información';
  public modalMessage: string = '';
  public modalSwitch: boolean = false;
  public modalDelete: boolean = false;
  public pages: number = 0;
  public inscripcionesPerPage: number = 5;
  public allInscripcionesPages: number = 0;
  public currentPage: number = 1;
  public idNumber: number;
  public user: any;
  public name: string;
  public currentSort: string = 'id,desc';
  public lastname: string;
  public instanceDetails: any[] = [];
  public originalData: any[] = [];
  searchTerm$ = new Subject<string>();
  listFiltered: any[] = [];
  inscripcionId: number;
  cuil: string;
  currentSearchTerm: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tokenService: TokenStorageService,
    private instanciaSedeService: InstanciaSedeService
  ) {}

  ngOnInit() {
    this.inscripcionId = this.tokenService.getInscription().id;
    this.getInstancy(this.inscripcionId, 0, '');
  }

  getInstancy(
    inscripcionId: number,
    page: number,
    sort: string,
    searchTerm: string = ''
  ) {
    this.instanciaSedeService
      .getInstanciaByInscripcionId(
        inscripcionId,
        page,
        this.inscripcionesPerPage,
        sort,
        searchTerm
      )
      .subscribe((response) => {
        this.tableData = response.content;

        this.tableData.forEach((row) => {
          const uniqueDays = new Set<string>();
          const horariosAgrupados = {};

          row.horarios = row.horarios.sort((a, b) => {
            return this.orderHours(a.horario) - this.orderHours(b.horario);
          });

          row.horarios.forEach((horario) => {
            uniqueDays.add(horario.dias);

            if (!horariosAgrupados[horario.dias]) {
              horariosAgrupados[horario.dias] = [];
            }

            horariosAgrupados[horario.dias].push(horario.horario);
          });

          row.horarios = Array.from(uniqueDays).map((dias) => ({
            dias: dias
              .split(' - ')
              .map((dia) => dia.substring(0, 3))
              .join(', '),
            horario: horariosAgrupados[dias]
              .sort((a, b) => {
                return this.orderHours(a) - this.orderHours(b);
              })
              .join('\n'),
            horarioFormateado: horariosAgrupados[dias]
              .sort((a, b) => this.orderHours(a) - this.orderHours(b))
              .map((timeSlot) => timeSlot.replace('a', '-'))
              .join(', '),
          }));
        });
        this.allInscripcionesPages = response.totalPages;
      });
  }

  onSearchEnter(searchTerm: string) {
    if (searchTerm.trim() !== '') {
      this.currentSearchTerm = searchTerm;
      this.getInstancy(this.inscripcionId, 0, this.currentSort, searchTerm);
      this.currentPage = 1;
    }
  }

  onSearchInput(searchTerm: string) {
    this.currentSearchTerm = searchTerm;
    this.getInstancy(this.inscripcionId, 0, this.currentSort, searchTerm);
    this.currentPage = 1;
  }

  onInscripcionesPageChange(page: number) {
    this.currentPage = page;
    const startPage = page - 1;
    this.getInstancy(
      this.inscripcionId,
      startPage,
      this.currentSort,
      this.currentSearchTerm
    );
  }

  inscribir(instanciaSede: any, instancia: any) {
    this.tokenService.saveInstanciaSede(instanciaSede);
    this.tokenService.saveInstancia(instancia);
    sessionStorage.setItem('inscribir', 'true');
    this.router.navigate(['./' + instanciaSede.id], {
      relativeTo: this.route,
    });
  }

  backToFirst() {
    this.currentPage = 1;
  }

  closeModal() {
    this.modalSwitch = false;
  }

  orderHours(timeString: string): number {
    const timeParts = timeString.split(' ');
    const time = timeParts[0];
    const [hours, minutes] = time.split(':').map((part) => parseInt(part, 10));
    return hours * 60 + minutes;
  }
}
