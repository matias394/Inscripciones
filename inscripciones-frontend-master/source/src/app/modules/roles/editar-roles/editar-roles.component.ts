import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RolesService } from '@modules/roles/roles.service';
import { rolesDto } from '@shared/models/rolesDto';

@Component({
  selector: 'app-editar-roles',
  templateUrl: './editar-roles.component.html',
  styleUrls: ['./editar-roles.component.scss'],
})
export class EditarRolesComponent implements OnInit {
  public rolesDto!: rolesDto;
  public id: number = 0;
  public nombre: any;
  public isAlert: boolean = false;
  public descripcion: any;
  public correct: boolean = false;
  public error: boolean = false;
  public modalSwitch: boolean = false;
  public modalTitle: string = 'Los datos ingresados no serán guardados';
  public modalMessage: string =
    'Si cancelas no podremos recuperar los datos ingresados';

  constructor(
    private rolesService: RolesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const { id } = params;
      this.getRolesById(id);
    });
  }

  openModal() {
    this.modalSwitch = true;
  }

  closeModal() {
    this.modalSwitch = false;
  }

  redirectToPage() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  getRolesById(id: number) {
    this.rolesService.getRolesById(id).subscribe((response) => {
      this.rolesDto = response;
      this.nombre = this.rolesDto.nombre;
      this.descripcion = this.rolesDto.descripcion;
    });
  }

  putRoles(form: any) {
    this.id = this.rolesDto.id;
    this.rolesDto = form.value;
    this.rolesDto.id = this.id;
    this.rolesDto.nombre = form.value.nombre;
    this.rolesDto.descripcion = form.value.descripcion;
    this.rolesDto.estado = 1;
    this.rolesDto.permisos = [0];
    this.rolesService.putRoles(this.rolesDto).subscribe(
      (response) => {
        this.correct = true;
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
}
