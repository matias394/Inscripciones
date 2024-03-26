import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '@modules/auth/token-storage.service';
import { AsignarProfesoresService } from '@modules/usuario-organismo/asignar-profesores/asignar-profesores.service';
import { Inscripciones } from '@modules/usuario-organismo/asignar-profesores/interfaces';
import { asignarProfesorDto } from '@shared/models/asignarProfesorDto';
import { MAX_WIDTH_MOBILE } from '@shared/models/windowSize';
import { WindowDimensionService } from '@shared/services/windowDimensionService.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-instancias',
  templateUrl: './instancias.component.html',
  styleUrls: ['./instancias.component.scss'],
})
export class InstanciasComponent {
  private dataUser: any;
  public asignarProfesorDto: asignarProfesorDto;
  public nombreInstancia: any;
  public instanciasData: any;
  public listaInscripciones: Array<Inscripciones> = [];
  public nombreInscripcion: any;
  public correct: boolean = false;
  public errorMessage: boolean = false;
  public errorFound: boolean = false;
  public idInscripcion: number;
  public lastDeletedOrganismo: any;
  public selectedOrganismo: any;
  public idOrganismo: number;
  public idUsuario: number;
  public isModalOpen: boolean = false;
  public isAlert: boolean = false;
  public modalSwitch: boolean = false;
  public disableSelects: boolean = false;
  public sinProfesorSelected: boolean = false;
  public itemIsSelected: boolean = false;
  public disableButton: boolean = false;
  public modalTitle: string = 'Los datos ingresados no serán guardados';
  public modalMessage: string =
    'Si cancelas no podremos recuperar los datos ingresados.';
  public listOrganismosProfesores: any[] = [];
  public organismosProfesorData: any[] = [];
  public organismosProfesorDataIds: any[] = [];
  public instanciasClaseDtoList: any;
  public instanciasClaseDtoListNombres: any;
  public selectValue: string = 'Nombre del profesor' || null;
  public value: string = '';
  public value2: string[] = [];
  public elementNombre: any;
  public profes: any;
  public elementApellido: any;
  private resizeSub: Subscription;
  public profesoresAsignados: any;
  public profesoresAsignadosString: any;
  public arrayDeIds: any;
  public instanciasDataIds: any;
  public maxWidthMobile = MAX_WIDTH_MOBILE;
  public windowWidth: number;
  public listActive: boolean = false;
  public detalles: any;
  @ViewChild('selectElement') selectElementRef: ElementRef;
  @ViewChild(TemplateRef, { static: true }) templateDesk: TemplateRef<any>;

  constructor(
    private asignarProfesoresService: AsignarProfesoresService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private windowDimensionService: WindowDimensionService
  ) {
    this.nombreInscripcion = this.tokenStorage.getInstanciaName();
    this.dataUser = this.tokenStorage.getUserData();
    this.idOrganismo = this.dataUser?.organismo?.id;
    this.idUsuario = this.dataUser?.id;
  }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe((params) => {
      const { id } = params; //ID DE LA INSCRIPCION
      this.idInscripcion = id;
    });
    await this.fetchOrganismosProfesor(); // Esperar a que se completen los organismos de profesor
    await this.fetchInstancias(this.idInscripcion); // Luego llamar a fetchInstancias()
    this.resizeSub = this.windowDimensionService.windowSizeChanged.subscribe(
      ({ width }) => {
        this.windowWidth = width;
        if (width <= this.maxWidthMobile) {
        } else {
        }
      }
    );
  }

  // MODALS
  openModal(id: number) {
    // Actualizar la variable sinProfesorSelected antes de abrir el modal
    this.sinProfesorSelected = this.listOrganismosProfesores?.some(
      (organismo) => organismo.nombre.includes('Sin Profesor')
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
    this.disableSelects = false;
  }

  openCancelarModal() {
    this.modalSwitch = true;
  }

  closeCancelarModal() {
    this.modalSwitch = false;
  }

  redirectToPage() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  closeAlert() {
    this.isAlert = false;
  }

  //TRAE TODOS LOS PROFESORES DISPONIBLES
  fetchOrganismosProfesor() {
    this.asignarProfesoresService
      .getOrganismosProfesor(this.idOrganismo, this.idInscripcion)
      .subscribe((response) => {
        this.organismosProfesorData = response;
        this.organismosProfesorDataIds = response?.map((el: any) => ({
          id: el.id,
          nombre: el.nombre + ' ' + el.apellido,
        }));
        this.listOrganismosProfesores = this.organismosProfesorDataIds
          ?.filter((item) =>
            this.profes.some((profesor) => profesor.includes(item.nombre))
          )
          .filter(
            (item, index, arr) =>
              index === arr.findIndex((el) => el.id === item.id)
          );
      });
  }

  //TRAE LAS INSTANCIAS DE LA INSCRIPCION (AGREGAR NOMBRE INSCRIPCION ACA)
  fetchInstancias(id: any) {
    this.asignarProfesoresService.getInstanciasOne(id).subscribe((response) => {
      this.instanciasData = response;
      this.instanciasDataIds = this.instanciasData?.map((el: any) => ({
        id: el.id,
      }));
      this.profes = this.instanciasData?.map((el: any) => el.nombreProfesores);
    });
  }

  //VER SI VA EL DE JUAN ACA EN ESTE ENDPOINT

  asignarInstancia(form: any) {
    this.asignarProfesorDto = form.value;
    this.asignarProfesorDto.inscripcionId = Number(this.idInscripcion);
    if (this.listOrganismosProfesores.some((el) => el.id === 1)) {
      this.asignarProfesorDto.profesores = [];
    } else {
      this.asignarProfesorDto.profesores = this.listOrganismosProfesores?.map(
        (el) => el.id
      );
    }
    this.asignarProfesoresService
      .asignarProfesorInstancias(this.asignarProfesorDto)
      .subscribe(
        (response) => {
          this.correct = true;
          this.disableButton = true;
          setTimeout(() => {
            this.router.navigate(['../../'], { relativeTo: this.route });
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
