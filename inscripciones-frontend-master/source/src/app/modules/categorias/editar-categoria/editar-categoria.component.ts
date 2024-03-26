import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { categoriasDto } from '@shared/models/categoriaDto';
import { CategoriasService } from '@shared/services/categorias.service';
import { SharedService } from '@shared/services/shared.service';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.scss'],
})
export class EditarCategoriaComponent {
  public form: FormGroup | undefined;
  public categoriasDto!: categoriasDto;
  public idCategoria: number;
  public nivel: number;
  public seq: number;
  public padreId: number;
  public estado: number;
  public disableButton: boolean = false;
  public organismoId: number;
  public confirm = false;
  public error = false;
  public isAlert = false;
  public opcionesOrganismo: any[] = [];
  public modalSwitch: boolean = false;
  public modalTitle: string = 'Los datos ingresados no serán guardados';
  public modalMessage: string =
    'Si cancelas no podremos recuperar los datos ingresados';
  public formControl = new FormControl();
  listName: any[];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoriasService: CategoriasService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      this.listName = params['list'];
      this.idCategoria = id;
      this.getCategoriaById(id);
    });
    this.form = this.formBuilder.group({
      nombre: new FormControl(
        { value: '', disabled: false },
        { validators: [Validators.required, this.validationNameEdit()] }
      ),
    });
  }
  get nombre() {
    return this.form.get('nombre');
  }
  createCategoria(form: any) {
    this.categoriasDto = form.value;
    this.categoriasDto.id = this.idCategoria;
    this.categoriasDto.nombre = this.nombre.value;
    this.categoriasDto.nivel = this.nivel;
    this.categoriasDto.seq = this.seq;
    this.categoriasDto.padreId = this.padreId;
    this.categoriasDto.organismoId = this.organismoId;
    this.categoriasDto.estado = this.estado;
    this.categoriasService
      .updateCategoria(this.categoriasDto, this.organismoId)
      .subscribe((response) => {
        if (response == true) {
          this.confirm = true;
          setTimeout(() => {
            this.router.navigate(['../'], { relativeTo: this.route });
          }, 2000);
        } else {
          this.error = true;
        }
      });
  }

  getCategoriaById(id: number) {
    this.categoriasService.getCategoriaById(id).subscribe((response) => {
      this.idCategoria = response.id;
      this.nombre.setValue(response.nombre);
      this.organismoId = response.organismoId;
      this.seq = response.seq;
      this.padreId = response.padreId;
      this.estado = response.estado;
      this.nivel = response.nivel;
      this.fetchOrganismos();
      this.nombreActual();
    });
  }

  fetchOrganismos() {
    this.sharedService.getOrganismos().subscribe((response) => {
      this.opcionesOrganismo = response;
    });
  }

  nombreActual() {
    const nombreActual = this.nombre.value;
    this.listName = this.listName.filter((name) => name != nombreActual);
  }
  //MODAL
  openModal() {
    this.modalSwitch = true;
  }

  closeModal() {
    this.modalSwitch = false;
  }

  redirectToPage() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  //CERRAR ALERTA
  closeAlert() {
    this.isAlert = false;
  }

  validationNameEdit(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      let validNames = true;
      if (!value) {
        return null;
      } else {
        if (this.listName != null && this.listName.length > 0) {
          if (
            this.listName.some(
              (e) =>
                e.toLowerCase().replaceAll(' ', '') ==
                value.toLowerCase().replaceAll(' ', '')
            )
          ) {
            validNames = false;
          }
        }
      }
      return !validNames ? { invalidName: true } : null;
    };
  }
}
