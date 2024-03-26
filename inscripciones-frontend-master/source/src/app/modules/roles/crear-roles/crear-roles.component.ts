import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RolesService } from '@modules/roles/roles.service';
import { rolesDto } from '@shared/models/rolesDto';

@Component({
  selector: 'app-crear-roles',
  templateUrl: './crear-roles.component.html',
  styleUrls: ['./crear-roles.component.scss'],
})
export class CrearRolesComponent implements OnInit {
  public rolesDto!: rolesDto;
  public correct: boolean = false;
  public error: boolean = false;
  public disableButton: boolean = false;
  public modalSwitch: boolean = false;
  public isAlert: boolean = false;
  public modalTitle: string = 'Los datos ingresados no serán guardados';
  public modalMessage: string =
    'Si cancelas no podremos recuperar los datos ingresados';

  constructor(
    private rolesService: RolesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  validateInputJustLetters(event: KeyboardEvent) {
    const inputChar = String.fromCharCode(event.charCode);
    const pattern = /[a-zA-Z\s]/;
    if (!pattern.test(inputChar) && event.key !== ' ') {
      event.preventDefault();
    }
  }

  postRoles(form: any) {
    this.rolesDto = form.value;
    this.rolesDto.estado = 1;
    this.rolesDto.permisos = [0];
    this.rolesService.postRoles(this.rolesDto).subscribe(
      (response) => {
        this.correct = true;
        this.disableButton = true;
        setTimeout(() => {
          this.router.navigate(['../'], { relativeTo: this.route });
        }, 2000);
      },
      (error) => {
        this.error = true;
        console.log(error);
      }
    );
  }

  closeAlert() {
    this.isAlert = false;
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
}
