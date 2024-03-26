import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { sedesDto } from '@shared/models/sedesDto';
import { SedesService } from '@shared/services/sedes.service';

@Component({
  selector: 'app-editar-sede',
  templateUrl: './editar-sede.component.html',
  styleUrls: ['./editar-sede.component.scss'],
})
export class EditarSedeComponent {
  public form: FormGroup | undefined;
  public sedesDto!: sedesDto;
  public idSede: string;
  public disableButton: boolean = false;
  public nombre: string;
  public direccion: string;
  public piso: string;
  public email: string;
  public telefono: string;
  public contacto: number;
  public opcionesContacto: any[] = [
    { id: 1, nombre: 'Email' },
    { id: 2, nombre: 'Teléfono' },
  ];
  public confirm = false;
  public error = false;
  public isAlert = false;
  public modalSwitch: boolean = false;
  public modalTitle: string = 'Los datos ingresados no serán guardados';
  public modalMessage: string =
    'Si cancelas no podremos recuperar los datos ingresados';
  public formControl = new FormControl();
  public selectedOption = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sedeService: SedesService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const { id } = params;
      this.idSede = id;
      this.getSedeById(id);
    });
  }

  createSede(form: any) {
    this.sedesDto = form.value;
    this.sedesDto.id = parseInt(this.idSede);
    this.sedesDto.nombre = this.nombre;
    this.sedesDto.direccion = this.direccion;
    this.sedesDto.piso = this.piso;
    this.sedesDto.contacto = this.selectedOption;
    this.sedesDto.email = this.email;
    this.sedesDto.telefono = this.telefono;
    this.sedesDto.bloqueado = 1;
    this.sedeService.updateSede(this.sedesDto).subscribe((response) => {
      if (response != null) {
        this.confirm = true;
        setTimeout(() => {
          this.router.navigate(['../'], { relativeTo: this.route });
        }, 2000);
      } else {
        this.error = true;
      }
    });
  }

  getSedeById(id: number) {
    this.sedeService.getSedesById(id).subscribe((response) => {
      this.nombre = response.nombre;
      this.piso = response.piso;
      this.direccion = response.direccion;
      if (response.telefono != null) {
        this.selectedOption = 2;
        this.telefono = response.telefono;
      } else if (response.email != null) {
        this.selectedOption = 1;
        this.email = response.email;
      } else {
        this.selectedOption = 0;
      }
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
}
