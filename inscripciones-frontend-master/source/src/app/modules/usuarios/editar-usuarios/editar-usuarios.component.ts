import { Subject } from 'rxjs';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Categorias, Organismos } from '@modules/inscripciones/interfaces';
import { UsuarioService } from '@modules/usuarios/usuario.service';
import { RolesService } from '@modules/roles/roles.service';
import { usuarioDto } from '@shared/models/usuarioDto';
import { SharedService } from '@shared/services/shared.service';

@Component({
  selector: 'app-editar-usuarios',
  templateUrl: './editar-usuarios.component.html',
  styleUrls: ['./editar-usuarios.component.scss'],
})
export class EditarUsuariosComponent implements OnInit {
  public form: FormGroup | undefined;
  public selectRoles: any;
  public selectOrganismo: any = [];
  public usuarioDto!: usuarioDto;
  public categoriaData: Array<any> = [];
  public categoria = new FormControl();
  public listaOrganismos: Array<Organismos> = [];
  public listaCategorias: Array<Categorias> = [];
  public listCategory: Array<any> = [];
  public id: number = 0;
  public nombre: any;
  public apellido: any;
  public email: any;
  public cuil: any;
  public organismo: any;
  public organismoEdit: any;
  public categoriaValue: any[] = [];
  public organismoValue: any;
  public categoriaName: any[] = [];
  public rolEdit: any;
  public optionSelected: any = { id: '', nombre: '' };
  public isAlert: boolean = false;
  public confirm: boolean = false;
  public error: boolean = false;
  public categoriaSelected: boolean = false;
  public validateCuil: any;
  public rolEditing = new FormControl();
  public organismoSelect$ = new Subject<string>();
  public organismoId: any;
  public catIdNumber: any;

  // Select Multiple
  public listCategories: any[] = [];
  public selectValue: string = 'Ninguna categoría seleccionada';
  public value: string = '';
  public value2: string[] = [];
  // Select filter
  public listActive: boolean = false;
  public listOrganismos: any[] = [];
  searchList$ = new Subject<string>();

  constructor(
    private usuarioService: UsuarioService,
    private rolesService: RolesService,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const { id } = params;
      this.getUserById(id);
    });
    this.organismoSeleccionado();
    this.getDatOrganismos();
    this.getRoles();
    this.filterList();
  }

  //ORGANISMO Y CATEGORIAS
  setValue(value, input, type: string): void {
    let val: any;
    switch (type) {
      case 'string':
        val = value.toString();
        break;
      case 'number':
        val = parseInt(value);
        break;
      case 'boolean':
        val = Number(value);
        break;
      default:
        val = value;
    }
  }

  getDatOrganismos(): void {
    this.sharedService.getOrganismos().subscribe((data) => {
      this.listaOrganismos = data;
    }); //ESTO LLENA LAS OPCIONES DE LOS SELECT ORGANISMO
  }

  getCategoriaById(id: any): void {
    this.sharedService.getCategoriaById(id).subscribe((data) => {
      this.listaCategorias = data;
    }); //ESTO TRAE LAS CATEGORIAS ASOCIADAS AL ID DEL ORGANISMO
  }

  organismoSeleccionado(): void {
    this.organismoSelect$.subscribe((event) => {
      this.setValue(event, 'organismo', 'number');
      this.organismoId = event;
      this.getCategoriaById(event);
      this.categoriaValue = [];
      this.categoriaName = [];
    }); //ESTO HACE QUE AL SELECCIONAR UN ORGANISMO SE ACTUALICE EL SELECT DE CATEGORIAS
  }

  getOrgaCateByCategoria(catId: any) {
    this.organismoId;
    this.sharedService
      .getOrgaCatById(this.organismoId, catId)
      .subscribe((data) => {
        this.organismoValue = data.organismo;
        this.catIdNumber = Number(catId);

        const matchingCategory = this.listaCategorias.find(
          (item) => item.id.toString() === catId
        );

        if (
          matchingCategory &&
          !this.categoriaName.some((el) => el.id === matchingCategory.id)
        ) {
          const matchingName = this.categoriaName.find(
            (el) => el.nombre === matchingCategory.nombre
          );
          if (!matchingName) {
            this.categoriaName.push(matchingCategory);
          }
        }
      });
  }

  getUserById(id: number) {
    this.usuarioService.getUsuarioById(id).subscribe((response) => {
      this.usuarioDto = response;
      this.optionSelected = {
        id: response?.organismo.id,
        nombre: response?.organismo.nombre,
      };
      this.organismoId = response?.organismo.id;
      this.organismoValue = response?.organismo?.id;
      this.getCategoriaById(this.organismoValue);
      this.categoriaValue = this.listaCategorias;
      this.categoriaName = response?.categorias?.map((item: any) => {
        return item;
      });
      this.rolEditing.setValue(response?.rol.id);
      this.nombre = this.usuarioDto.nombre;
      this.apellido = this.usuarioDto.apellido;
      this.email = this.usuarioDto.email;
      this.cuil = this.usuarioDto.cuil;
    });
  }

  putUser(form: any) {
    this.id = this.usuarioDto.id;
    this.usuarioDto = form.value;
    this.usuarioDto.id = this.id;
    this.usuarioDto.cuil = this.cuil;
    this.usuarioDto.rol = parseInt(this.rolEditing.value);
    this.usuarioDto.email = this.email;
    this.usuarioDto.apellido = this.apellido;
    this.usuarioDto.nombre = this.nombre;
    this.usuarioDto.organismo = this.organismoValue;
    this.usuarioDto.categoria = this.categoriaName.map((el) => parseInt(el.id));
    this.usuarioDto.estado = 1;
    this.usuarioService.putUsuario(this.usuarioDto).subscribe(
      (response) => {
        this.confirm = true;
        setTimeout(() => {
          this.router.navigate(['../'], { relativeTo: this.route });
        }, 2000);
      },
      (error) => {
        console.log(error);
        this.error = true;
      }
    );
  }

  closeAlert() {
    this.isAlert = false;
  }

  getRoles() {
    this.rolesService.getRoles().subscribe((response) => {
      this.selectRoles = response.content;
    });
  }

  @HostListener('click', ['$event'])
  ShowList(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.listActive = true;
    if (target.id === 'input-organismo' || target.id === 'input-filter-list') {
      this.listActive = true;
    } else {
      this.listActive = false;
    }
  }
  filterList(): void {
    this.searchList$.subscribe((text) => {
      this.selectOrganismo = this.listOrganismos.filter((item) =>
        item.nombre.toLowerCase().includes(text.toLowerCase())
      );
    });
  }
  slcOrganismo(organismo: any) {
    this.listActive = !this.listActive;
    this.organismoValue = organismo;
  }

  removeItem(id: any) {
    const index = this.categoriaName.findIndex((el) => el.id === id);
    if (index !== -1) {
      const removedItem = this.categoriaName.splice(index, 1)[0];
      const selectedIndex = this.categoriaValue.findIndex(
        (el) => el.id === removedItem.id
      );
      if (selectedIndex !== -1) {
        this.categoriaValue.splice(selectedIndex, 1);
      }
    }
    this.categoria.setValue(null);
  }
}
