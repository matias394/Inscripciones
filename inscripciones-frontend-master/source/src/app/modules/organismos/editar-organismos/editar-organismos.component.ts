import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganismoService } from '@shared/services/organismo.service';
import { organismoDto } from '@shared/models/organismoDto';

@Component({
  selector: 'app-editar-organismos',
  templateUrl: './editar-organismos.component.html',
  styleUrls: ['./editar-organismos.component.scss'],
})
export class EditarOrganismosComponent implements OnInit {
  public form: FormGroup | undefined;
  public organismoDto!: organismoDto;
  public isAlert: boolean = false;
  public correct: boolean = false;
  public name: string = '';
  public error: boolean = false;
  public organismoId: number = 0;
  public modalSwitch: boolean = false;
  public modalTitle: string = 'Los datos ingresados no serán guardados';
  public modalMessage: string =
    'Si cancelas no podremos recuperar los datos ingresados';

  constructor(
    private organismoService: OrganismoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const { id } = params;
      this.getOrganismo(id);
    });
  }

  getOrganismo(id: number) {
    this.organismoService.getOrganismoById(id).subscribe((response) => {
      this.organismoDto = response;
      this.organismoId = response.id;
      this.name = this.organismoDto.nombre;
    });
  }

  editOrganismo(form: any) {
    this.organismoId = this.organismoDto.id;
    this.organismoDto = form.value;
    this.organismoDto.id = this.organismoId;
    this.organismoDto.nombre = form.value.nombre;
    this.organismoDto.estado = 1;
    this.organismoService.putOrganismos(this.organismoDto).subscribe(
      (response) => {
        this.correct = true;
        setTimeout(() => {
          this.router.navigate(['../'], { relativeTo: this.route });
        }, 2000);
      },
      (error) => {
        this.error = true;
      }
    );
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

  closeAlert() {
    this.isAlert;
  }
}
