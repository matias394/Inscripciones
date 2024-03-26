import moment from 'moment';
import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '@modules/auth/token-storage.service';
import { AsignarProfesoresService } from '@modules/usuario-organismo/asignar-profesores/asignar-profesores.service';
import { Inscripciones } from '@modules/usuario-organismo/asignar-profesores/interfaces';
import { asignarProfesorDto } from '@shared/models/asignarProfesorDto';
import { Subscription } from 'rxjs';
import { MAX_WIDTH_MOBILE } from '@shared/models/windowSize';
import { WindowDimensionService } from '@shared/services/windowDimensionService.service';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.scss'],
})
export class ClasesComponent {
  private dataUser: any;
  public moment: any = moment();
  public asignarProfesorDto: asignarProfesorDto;
  public listaInscripciones: Array<Inscripciones> = [];
  public profesoresAsignados: any;
  public profesoresAsignadosString: any;
  public nombreInscripcion: string = '';
  public nombreInstancia: string = '';
  public correct: boolean = false;
  public instanciasData: any[] = [];
  public instanciaDataDto: any;
  public errorMessage: boolean = false;
  public errorFound: boolean = false;
  private resizeSub: Subscription;
  public maxWidthMobile = MAX_WIDTH_MOBILE;
  public windowWidth: number;
  public lastDeletedOrganismo: any;
  public selectedOrganismo: any;
  public disableSelects: boolean = false;
  public sinProfesorSelected: boolean = false;
  private idInscripcion: number;
  public idInstancia: number;
  public idOrganismo: number;
  public isModalOpen: boolean = false;
  public isAlert: boolean = false;
  public idNumber: number;
  public disableButton: boolean = false;
  public modalSwitch: boolean = false;
  public profesoresYaAsignados: any;
  public clasesData: any[] = [];
  public instanciasDataIds: any;
  public profes: any;
  public itemIsSelected: boolean = false;
  public modalTitle: string = 'Los datos ingresados no serán guardados';
  public modalMessage: string =
    'Si cancelas no podremos recuperar los datos ingresados.';
  public listOrganismosProfesores: any[] = [];
  public organismosProfesorData: any[] = [];
  public organismosProfesorDataIds: any[] = [];
  public nombreProfesores: any;
  public selectValue: string = 'Nombre del profesor' || null;
  public value: string = '';
  public value2: string[] = [];
  public listActive: boolean = false;
  public elementId: number;
  public fechaClaseArray: any[] = [];
  public fechaClase: any;
  @ViewChild('selectElement') selectElementRef: ElementRef;
  @ViewChild(TemplateRef, { static: true }) templateDesk: TemplateRef<any>;

  constructor(
    private asignarProfesoresService: AsignarProfesoresService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private windowDimensionService: WindowDimensionService
  ) {
    this.dataUser = this.tokenStorage.getUserData();
    this.idOrganismo = this.tokenStorage.getUserData().organismo.id;
  }

  async ngOnInit(): Promise<void> {
    this.idInscripcion = Number(this.router.url.split('/')[3]);

    this.route.params.subscribe((params) => {
      const { id } = params; //ID DE LA INSTANCIA SEDE
      this.idNumber = id;
    });

    await Promise.all([
      this.fetchOrganismosProfesor(),
      this.fetchInstancias(this.idInscripcion),
    ]).then(() => {
      this.fetchClases(this.idNumber);
    });

    this.resizeSub = this.windowDimensionService.windowSizeChanged.subscribe(
      ({ width }) => {
        this.windowWidth = width;
        if (width <= this.maxWidthMobile) {
        } else {
        }
      }
    );
  }

  //MODALES
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
    this.router.navigate(['../../../../'], { relativeTo: this.route });
  }

  //SERVICIOS

  fetchOrganismosProfesor() {
    this.asignarProfesoresService
      .getOrganismosProfesor(this.idOrganismo, this.idInscripcion)
      .subscribe((response) => {
        this.organismosProfesorData = response;
        this.organismosProfesorData.forEach((el) => {
          this.organismosProfesorDataIds.push({
            id: el.id,
            nombre: el.nombre + ' ' + el.apellido,
          });
        });
      });
  }

  fetchClases(id: any) {
    //TRAE LAS CLASES EN CADA INSTANCIA SEDE
    this.asignarProfesoresService
      .getInstanciaSedes(id)
      .subscribe((response) => {
        this.clasesData = response.claseDTO;
        this.instanciasDataIds = this.instanciasData?.map((el: any) => ({
          id: el.id,
        }));
        this.profes = this.clasesData?.map((el: any) => el.nombreProfesores);

        this.nombreInscripcion = response.nombreInscripcion;
        this.nombreInstancia = response.nombreInstancia;
      });
  }

  fetchInstancias(id: any) {
    this.asignarProfesoresService.getInstancias(id).subscribe((response) => {
      this.instanciasData = response;
      this.listOrganismosProfesores = this.organismosProfesorDataIds
        .filter((item) => this.profes.includes(item.nombre))
        .filter(
          (item, index, arr) =>
            index === arr.findIndex((el) => el.id === item.id)
        );
    });
  }

  asignarClase(form: any) {
    this.asignarProfesorDto = form.value;
    this.asignarProfesorDto.instanciaId = Number(this.idNumber);
    if (this.listOrganismosProfesores.some((el) => el.id === 1)) {
      this.asignarProfesorDto.profesores = [];
    } else {
      this.asignarProfesorDto.profesores = this.listOrganismosProfesores?.map(
        (el) => el.id
      );
    }
    this.asignarProfesoresService
      .asignarProfesorClases(this.asignarProfesorDto)
      .subscribe(
        (response) => {
          this.correct = true;
          this.disableButton = true;
          setTimeout(() => {
            this.router.navigate(['../../../..'], { relativeTo: this.route });
          }, 2000);
        },
        (error) => {
          this.errorFound = true;
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
