import { Subject } from 'rxjs';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '@modules/usuarios/usuario.service';
import { usuarioDto } from '@shared/models/usuarioDto';
import { RolesService } from '@modules/roles/roles.service';
import { Categorias, Organismos } from '@modules/inscripciones/interfaces';
import { SharedService } from '@shared/services/shared.service';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.scss'],
})
export class CrearUsuariosComponent implements OnInit {
  public form: FormGroup | undefined;
  public selectRoles: any;
  public selectOrganismo: any = [];
  public usuariosDto!: usuarioDto;
  public disableButton: boolean = false;
  public nombre: any;
  public apellido: any;
  public email: any;
  public categoriaData: any[] = [];
  public cuil: any;
  public categoria = new FormControl();
  public categoriaValue: any[] = [];
  public organismoValue: any;
  public categoriaName: any[] = [];
  public confirm = false;
  public error = false;
  public errorDatos = false;
  public isAlert = false;
  public errorUserNotExisting = false;
  public errorCuilData = false;
  public formControl = new FormControl();
  public formControl2 = new FormControl();
  public organismo = new FormControl();
  public listaOrganismos: Array<Organismos> = [];
  public listaCategorias: Array<Categorias> = [];
  public optionSelected: any = { id: '', nombre: '' };
  public organismoId: any;
  public organismoSelect$ = new Subject<string>();
  public listActive: boolean = false;
  searchList$ = new Subject<string>();

  constructor(
    private usuarioService: UsuarioService,
    private rolesService: RolesService,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.getDatOrganismos();
    this.organismoSeleccionado();
    this.getRoles();
    this.filterList();
    this.formControl.setValidators(Validators.minLength(11));
    this.categoria.setValidators(Validators.required);
    this.organismo.setValidators(Validators.required);

    this.formControl.updateValueAndValidity();
    this.categoria.updateValueAndValidity();
    this.organismo.updateValueAndValidity();
  }

  validateFormat(event) {
    let key;
    if (event.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
    } else {
      key = event.keyCode;
      key = String.fromCharCode(key);
    }

    const regex = new RegExp('^[0-9,$]*$');
    if (!regex.test(key)) {
      event.returnValue = false;
      if (event.preventDefault) {
        event.preventDefault();
      }
    }
  }

  createUser(form: any) {
    this.usuariosDto = form.value;
    this.usuariosDto.nombre = this.nombre;
    this.usuariosDto.apellido = this.apellido;
    this.usuariosDto.email = this.email;
    this.usuariosDto.rol = parseInt(form.value.rol);
    this.usuariosDto.organismo = this.organismoValue;
    this.usuariosDto.categoria = this.categoriaValue;
    this.usuariosDto.estado = 1;
    this.validateByCuil(this.usuariosDto);
  }

  //ROLES

  getRoles() {
    this.rolesService.getRoles().subscribe((response) => {
      this.selectRoles = response.content;
    });
  }

  //ORGANISMO Y CATEGORIA

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

  getCategoriaById(id: string): void {
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

  getOrgaCateByCategoria(catId: String) {
    const organismo = this.organismoId;
    this.sharedService.getOrgaCatById(organismo, catId).subscribe((data) => {
      this.organismoValue = data.organismo;

      if (!this.categoriaValue.includes(Number(data.categoria))) {
        this.categoriaValue = this.categoriaValue.concat(
          Number(data.categoria)
        );
      }

      const matchingCategory = this.listaCategorias.find(
        (item) => item.id.toString() === catId
      );

      if (
        matchingCategory &&
        !this.categoriaName.some((el) => el.id === matchingCategory.id)
      ) {
        const matchingName = this.categoriaName.find(
          (el) => el === matchingCategory.nombre
        );
        if (!matchingName) {
          this.categoriaName.push(matchingCategory.nombre);
        }
      }
    });
  }

  removeItem(id: any) {
    const index = this.categoriaName.findIndex((item) => item === id);
    if (index !== -1) {
      this.categoriaName.splice(index, 1);
    }
    const valueIndex = this.categoriaValue.findIndex((item) => item === id);
    if (valueIndex !== -1) {
      this.categoriaValue.splice(valueIndex, 1);
    }
  }

  //CERRAR ALERTA

  closeAlert() {
    this.isAlert = false;
  }

  //OBTENER USUARIO CON CUIL

  getUsuarioByCuil(form: any) {
    this.usuarioService.getUsuarioByCuil(form.value.cuil).subscribe(
      (response) => {
        this.usuariosDto = response;
        this.nombre = this.usuariosDto.nombre;
        this.apellido = this.usuariosDto.apellido;
        this.email = this.usuariosDto.email;
      },
      (error) => {
        console.log(error);
        this.errorUserNotExisting = true;
      }
    );
  }

  validateByCuil(usuarioDto: any) {
    this.usuarioService.getUsuarioByCuil(usuarioDto.cuil).subscribe(
      (response) => {
        if (
          usuarioDto.nombre === response.nombre &&
          usuarioDto.apellido === response.apellido &&
          response.email === usuarioDto.email
        ) {
          this.usuarioService.postUsuario(usuarioDto).subscribe(
            (response) => {
              console.log('Correcto');
              this.confirm = true;
              this.disableButton = true;
              setTimeout(() => {
                this.router.navigate(['../'], { relativeTo: this.route });
              }, 2000);
            },
            (error) => {
              console.log(error);
              this.error = true;
            }
          );
        } else {
          this.errorCuilData = true;
        }
      },
      (error) => {
        console.log(error);
        this.errorDatos = true;
      }
    );
  }

  @HostListener('click', ['$event'])
  ShowList(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    if (target.id === 'input-organismo' || target.id === 'input-filter-list') {
      this.listActive = true;
    } else {
      this.listActive = false;
    }
  }

  //FILTRAR LA LISTA

  filterList(): void {
    this.searchList$.subscribe((text) => {
      this.selectOrganismo = this.listaOrganismos.filter((item) =>
        item.nombre.toLowerCase().includes(text.toLowerCase())
      );
    });
  }
}
