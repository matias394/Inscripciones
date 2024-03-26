import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { sedesDto } from '@shared/models/sedesDto';
import { SedesService } from '@shared/services/sedes.service';

@Component({
  selector: 'app-crear-sede',
  templateUrl: './crear-sede.component.html',
  styleUrls: ['./crear-sede.component.scss'],
})
export class CrearSedeComponent {
  public form: FormGroup | undefined;
  public sedesDto!: sedesDto;
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

  ngOnInit(): void {}

  createSede(form: any) {
    this.sedesDto = form.value;
    this.sedesDto.nombre = this.nombre;
    this.sedesDto.direccion = this.direccion;
    this.sedesDto.piso = this.piso;
    this.sedesDto.contacto = this.selectedOption;
    this.sedesDto.email = this.email;
    this.sedesDto.telefono = this.telefono;
    this.sedesDto.bloqueado = 1;
    this.sedeService.createSedes(this.sedesDto).subscribe((response) => {
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
