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
  selector: 'app-crear-sede',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.scss'],
})
export class CrearCategoriaComponent {
  public form: FormGroup | undefined;
  public categoriasDto!: categoriasDto;
  public disableButton: boolean = false;
  public idCategoria: number;
  public nivel: number;
  public seq: number;
  public padreId: number;
  public estado: number;
  public confirm = false;
  public error = false;
  public isAlert = false;
  public opcionesOrganismo: any[] = [];
  public modalSwitch: boolean = false;
  public modalTitle: string = 'Los datos ingresados no serán guardados';
  public modalMessage: string =
    'Si cancelas no podremos recuperar los datos ingresados';
  public formControl = new FormControl();
  public selectedOption = 0;
  listName: any[];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoriasService: CategoriasService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      nombre: new FormControl(
        { value: '', disabled: false },
        { validators: [Validators.required, this.validationName()] }
      ),
      organismoId: new FormControl(
        { value: '', disabled: false },
        { validators: [Validators.required] }
      ),
    });
  }
  get nombre() {
    return this.form.get('nombre');
  }
  get organismoId() {
    return this.form.get('organismoId');
  }
  ngOnInit(): void {
    this.fetchOrganismos();
    this.route.queryParams.subscribe((params) => {
      this.listName = params['list'];
    });
  }

  createCategoria(form: any) {
    this.categoriasDto = form.value;
    this.categoriasDto.id = null;
    this.categoriasDto.nombre = this.nombre.value;
    this.categoriasDto.nivel = 0;
    this.categoriasDto.seq = 0;
    this.categoriasDto.padreId = 0;
    this.categoriasDto.organismoId = this.organismoId.value;
    this.categoriasDto.estado = 1;
    this.categoriasService
      .createCategoria(this.categoriasDto, this.organismoId.value)
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

  fetchOrganismos() {
    this.sharedService.getOrganismos().subscribe((response) => {
      this.opcionesOrganismo = response;
    });
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

  validationName(): ValidatorFn {
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
