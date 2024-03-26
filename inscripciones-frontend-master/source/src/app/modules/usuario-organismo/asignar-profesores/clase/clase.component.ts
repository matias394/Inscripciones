import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '@modules/auth/token-storage.service';
import { AsignarProfesoresService } from '@modules/usuario-organismo/asignar-profesores/asignar-profesores.service';
import { Inscripciones } from '@modules/usuario-organismo/asignar-profesores/interfaces';
import { asignarProfesorDto } from '@shared/models/asignarProfesorDto';
import { MAX_WIDTH_MOBILE } from '@shared/models/windowSize';
import { WindowDimensionService } from '@shared/services/windowDimensionService.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-clase',
  templateUrl: './clase.component.html',
  styleUrls: ['./clase.component.scss'],
})
export class ClaseComponent {
  private dataUser: any;
  public idNumber: number;
  public asignarProfesorDto: asignarProfesorDto;
  public listaInscripciones: Array<Inscripciones> = [];
  public sede: string;
  public nombreProfesores: string = '';
  public idInscripcion: number;
  public idInstancia: number;
  public idOrganismo: number;
  public nombreInstancia: string;
  public nombreInscripcion: any;
  public isModalOpen: boolean = false;
  public modalSwitch: boolean = false;
  public clasesData: any[] = [];
  public claseData: any;
  public claseNombre: string = '';
  public lastDeletedOrganismo: any;
  public selectedOrganismo: any;
  public claseId: number;
  public claseFechaInicio: string = '';
  public claseFechaFin: string = '';
  public disableButton: boolean = false;
  public itemIsSelected: boolean = false;
  public disableSelects: boolean = false;
  public sinProfesorSelected: boolean = false;
  public modalTitle: string = 'Los datos ingresados no serán guardados';
  public modalMessage: string =
    'Si cancelas no podremos recuperar los datos ingresados.';
  public listOrganismosProfesores: any[] = [];
  public organismosProfesorData: any[] = [];
  public organismosProfesorDataIds: any[] = [];
  public isAlert: boolean = false;
  public correct: boolean = false;
  private resizeSub: Subscription;
  public maxWidthMobile = MAX_WIDTH_MOBILE;
  public windowWidth: number;
  public instanciasData: any[] = [];
  public errorMessage: boolean = false;
  public profesoresAsignados: any;
  public errorFound: boolean = false;
  public selectValue: string = 'Nombre del Profesor' || null;
  public value: string = '';
  public value2: string[] = [];
  public listActive: boolean = false;
  public elementId: number;
  public elementNombre: string;
  public elementApellido: string;
  @ViewChild('selectElement') selectElementRef: ElementRef;

  constructor(
    private asignarProfesoresService: AsignarProfesoresService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private windowDimensionService: WindowDimensionService
  ) {
    this.dataUser = this.tokenStorage.getUserData();
    this.idOrganismo = this.dataUser?.organismo?.id;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const { id } = params; //ID DE LA CLASE
      this.idNumber = id;
    });

    this.idInscripcion = Number(this.router.url.split('/')[3]);
    this.idInstancia = Number(this.router.url.split('/')[5]);

    this.fetchClase(this.idNumber), this.fetchOrganismosProfesor();

    this.resizeSub = this.windowDimensionService.windowSizeChanged.subscribe(
      ({ width }) => {
        this.windowWidth = width;
        if (width <= this.maxWidthMobile) {
        } else {
        }
      }
    );
  }

  openModal(id: number) {
    // Actualizar la variable sinProfesorSelected antes de abrir el modal
    this.sinProfesorSelected = this.listOrganismosProfesores.some((organismo) =>
      organismo.nombre.includes('Sin Profesor')
    );
    this.isModalOpen = true;
    this.idInscripcion = id; // ID DE LA INSCRIPCION

    // Desactivar los selects si se seleccionó "Sin Profesor" previamente
    if (
      this.sinProfesorSelected &&
      this.listOrganismosProfesores.length === 1
    ) {
      this.disableSelects = true;
    }
  }

  closeModal() {
    this.isModalOpen = false;
    // Reiniciar el estado de inhabilitación de los selects al cerrar el modal
    this.disableSelects = false;
  }

  closeAlert() {
    this.isAlert = false;
  }

  openCancelarModal() {
    this.modalSwitch = true;
  }

  closeCancelarModal() {
    this.modalSwitch = false;
  }

  redirectToPage() {
    this.router.navigate(['../../../../../../'], { relativeTo: this.route });
  }

  //SERVICIOS

  fetchClase(id: any) {
    this.asignarProfesoresService.getClase(id).subscribe((response) => {
      this.claseData = response.claseDTO;
      this.claseNombre = response.nombreClase;
      this.nombreInscripcion = response.nombreInscripcion;
      this.nombreInstancia = response.nombreInstancia;
      this.nombreProfesores = this.claseData?.nombreProfesores;
    });
  }

  fetchOrganismosProfesor() {
    this.asignarProfesoresService
      .getOrganismosProfesor(this.idOrganismo, this.idInscripcion)
      .subscribe((response) => {
        this.organismosProfesorData = response;

        this.organismosProfesorDataIds = response?.map((el: any) => ({
          id: el.id,
          nombre: el.nombre + ' ' + el.apellido,
        }));

        const profes = this.nombreProfesores?.split(',') || [];

        this.listOrganismosProfesores = this.organismosProfesorDataIds
          ?.filter((item) =>
            profes.some((profesor) => profesor.includes(item.nombre))
          )
          .filter(
            (item, index, arr) =>
              index === arr.findIndex((el) => el.id === item.id)
          );
      });
  }

  asignarClase(form: any) {
    this.asignarProfesorDto = form.value;
    this.asignarProfesorDto.claseId = Number(this.idNumber);
    if (this.listOrganismosProfesores.some((el) => el.id === 1)) {
      this.asignarProfesorDto.profesores = [];
    } else {
      this.asignarProfesorDto.profesores = this.listOrganismosProfesores?.map(
        (el) => el.id
      );
    }
    this.asignarProfesoresService
      .asignarProfesorClase(this.asignarProfesorDto)
      .subscribe(
        (response) => {
          this.correct = true;
          this.disableButton = true;
          setTimeout(() => {
            this.router.navigate(['../../../../../..'], {
              relativeTo: this.route,
            });
          }, 2000);
        },
        (error) => {
          this.errorMessage = true;
        }
      );
  }

  //AGREGA O QUITA ELEMENTOS DE LA LISTA AL AGREGAR Y REMOVER PROFESORES

  removeItem(id: any) {
    const index = this.listOrganismosProfesores?.findIndex(
      (item) => item.id === id
    );
    if (index !== undefined && index >= 0) {
      const deletedOrganismo = this.listOrganismosProfesores[index];
      this.listOrganismosProfesores.splice(index, 1);
      if (
        this.selectedOrganismo &&
        deletedOrganismo.id === this.selectedOrganismo.id
      ) {
        this.selectedOrganismo = null;
      }
      const selectEl = this.selectElementRef.nativeElement as HTMLSelectElement;
      selectEl.selectedIndex = 0;

      // Verificar si se eliminó el item "Sin Profesor"
      if (deletedOrganismo.nombre.includes('Sin Profesor')) {
        this.itemIsSelected = false; // Activar los select nuevamente
        if (this.listOrganismosProfesores.length === 0) {
          this.disableSelects = false;
        }
      }
    }
  }

  onChangeSlc(id: any) {
    const selectedOrganismo = this.organismosProfesorData?.find(
      (el) => el.id === Number(id)
    );
    if (selectedOrganismo) {
      if (selectedOrganismo.nombre.includes('Sin Profesor')) {
        this.listOrganismosProfesores = [
          {
            id: selectedOrganismo.id,
            nombre: selectedOrganismo.nombre + ' ' + selectedOrganismo.apellido,
          },
        ];
        // Actualizar la variable sinProfesorSelected al seleccionar "Sin Profesor"
        this.sinProfesorSelected = true;
      } else {
        const existingOrganismoIndex = this.listOrganismosProfesores?.findIndex(
          (item) => item.id === selectedOrganismo.id
        );
        if (existingOrganismoIndex >= 0) {
          this.listOrganismosProfesores[existingOrganismoIndex].nombre =
            selectedOrganismo.nombre + ' ' + selectedOrganismo.apellido;
        } else {
          if (
            this.lastDeletedOrganismo &&
            this.lastDeletedOrganismo.id === selectedOrganismo.id
          ) {
            this.listOrganismosProfesores?.push({
              id: selectedOrganismo.id,
              nombre:
                selectedOrganismo.nombre + ' ' + selectedOrganismo.apellido,
            });
            this.lastDeletedOrganismo = null;
          } else {
            this.listOrganismosProfesores?.push({
              id: selectedOrganismo.id,
              nombre:
                selectedOrganismo.nombre + ' ' + selectedOrganismo.apellido,
            });
          }
        }
        // Si se agrega un profesor distinto de "Sin Profesor", actualizar sinProfesorSelected a false
        this.sinProfesorSelected = false;
      }
    }

    // Verificar si se seleccionó "Sin Profesor" y desactivar los select si es necesario
    this.disableSelects = this.sinProfesorSelected;
  }
}
