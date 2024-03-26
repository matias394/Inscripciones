import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { TokenStorageService } from '@modules/auth/token-storage.service';
import { MAX_WIDTH_MOBILE } from '@shared/models/windowSize';
import { WindowDimensionService } from '@shared/services/windowDimensionService.service';
import { Location } from '@angular/common';

@Component({
  selector: 'nav-sidebar',
  templateUrl: './nav-sidebar.component.html',
  styleUrls: ['./nav-sidebar.component.scss'],
})
export class NavSidebarComponent implements OnInit {
  public nombre: string;
  public path: any;
  public nav = MENU;
  public navItems: Array<any> = [];
  public windowWidth: number;
  public disabledValue: boolean;
  private resizeSub: Subscription;
  public maxWidthMobile = MAX_WIDTH_MOBILE;
  btnClickInscribite$ = new Subject();
  public modalSwitch: boolean = false;
  public modalTitle: string = '¿Deseas salir del formulario?';
  public modalMessage: string =
    'Si sales del formulario no podremos recuperar los datos.';
  @ViewChild(TemplateRef, { static: true }) templateDesk: TemplateRef<any>;
  @ViewChild(TemplateRef, { static: true }) templateMob: TemplateRef<any>;
  public rol: number = 0; // TODO: Esto viene del login sessionStorage

  constructor(
    private tokenStorage: TokenStorageService,
    private windowDimensionService: WindowDimensionService,
    private router: Router,
    private locations: Location
  ) {
    this.rol = this.tokenStorage.getUser().id_rol;
    this.nombre = this.tokenStorage.getUser().nombre;
  }

  ngOnInit(): void {
    this.createItemNav();
    this.resizeSub = this.windowDimensionService.windowSizeChanged.subscribe(
      ({ width }) => {
        this.windowWidth = width;
        if (width <= this.maxWidthMobile) {
        } else {
        }
      }
    );
  }

  ngOnDestroy() {
    this.resizeSub.unsubscribe();
  }

  logout() {
    window.sessionStorage.clear();
    this.router.navigate(['login']);
  }

  createItemNav(): void {
    this.navItems = this.nav.filter((n) => {
      return n.rol!.indexOf(this.rol) > -1;
    });
  }

  goItem(path) {
    this.path = path;
    if (
      window.location.href.includes('crear') &&
      (window.location.href.includes('formularios') ||
        window.location.href.includes('inscripciones'))
    ) {
      this.modalSwitch = true;
    } else this.router.navigate(this.path);

    sessionStorage.removeItem('inscribir')
  }
  volver(): void {
    this.modalSwitch = false;
    this.router.navigate(this.path);
  }

  closeModal() {
    this.modalSwitch = false;
  }
}

export const MENU = [
  {
    name: 'Inicio',
    iconClass: 'bx bx-grid-alt',
    path: ['/inicio'],
    rol: [1, 2, 3, 4],
    disabled: false,
  },
  {
    name: 'Usuarios',
    iconClass: 'bx bx-user-check',
    path: ['/usuarios'],
    rol: [1],
    disabled: false,
  },
  {
    name: 'Roles',
    iconClass: 'bx bx-user',
    path: ['/roles'],
    rol: [1],
    disabled: false,
  },
  {
    name: 'Organismos',
    iconClass: 'bx bx-building',
    path: ['/organismos'],
    rol: [1],
    disabled: true,
  },
  {
    name: 'Categorias',
    iconClass: 'bx bx-purchase-tag',
    path: ['/categorias'],
    rol: [1],
    disabled: true,
  },
  {
    name: 'Sedes',
    iconClass: 'bx bx-home',
    path: ['/sedes'],
    rol: [1],
    disabled: true,
  },
  {
    name: 'Formularios',
    iconClass: 'bx bx-list-ul',
    path: ['/formularios'],
    rol: [1],
    disabled: false,
  },
  {
    name: 'Inscripciones',
    iconClass: 'bx bx-file',
    path: ['/inscripciones'],
    rol: [1],
    disabled: true,
  },
  // {
  //   name: 'Reportes',
  //   iconClass: 'bx bx-objects-vertical-bottom',
  //   path: ['/reportes'],
  //   rol: [1],
  //   disabled: true,
  // },
  // {
  //   name: 'Cursos',
  //   iconClass: 'bx bx-folder',
  //   path: ['/cursos'],
  //   rol: [1],
  //   disabled: true,
  // },
  {
    name: 'Consulta de cursos',
    iconClass: 'bx bx-list-ul',
    path: ['/usuario-organismo-consulta'],
    rol: [2],
    disabled: true,
  },
  {
    name: 'Asistencia',
    iconClass: 'bx bx-user-check',
    path: ['/usuario-organismo-asistencia'],
    rol: [2],
    disabled: true,
  },
  {
    name: 'Asignar profesores',
    iconClass: 'bx bx-plus',
    path: ['/usuario-organismo-asignar'],
    rol: [2],
    disabled: true,
  },
  {
    name: 'Gestión de inscriptos',
    iconClass: 'bx bx-file',
    path: ['/gestion'],
    rol: [1, 2],
    disabled: true,
  },
  {
    name: 'Reportes',
    iconClass: 'bx bx-objects-vertical-bottom',
    path: ['/usuario-organismo-reportes'],
    rol: [2],
    disabled: true,
  },
  {
    name: 'Asistencias',
    iconClass: 'bx bx-folder',
    path: ['/asistencias'],
    rol: [3],
    disabled: true,
  },
  // {
  //   name: 'Notas',
  //   iconClass: 'bx bx-user-check',
  //   path: ['/notas'],
  //   rol: [3],
  //   disabled: true,
  // },
  {
    name: 'Eventos',
    iconClass: 'bx bx-star',
    path: ['/usuario-eventos-eventos'],
    rol: [4],
    disabled: true,
  },
  {
    name: 'Asistencia',
    iconClass: 'bx bx-user-check',
    path: ['/usuario-eventos-asistencia'],
    rol: [4],
    disabled: true,
  },
  // {
  //   name: 'Reportes',
  //   iconClass: 'bx bx-objects-vertical-bottom',
  //   path: ['/usuario-eventos-reportes'],
  //   rol: [4],
  //   disabled: true,
  // },
];
