import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { organismoDto } from '@shared/models/organismoDto';
import { OrganismoService } from '@shared/services/organismo.service';

@Component({
  selector: 'app-crear-organismos',
  templateUrl: './crear-organismos.component.html',
  styleUrls: ['./crear-organismos.component.scss'],
})
export class CrearOrganismosComponent implements OnInit {
  public form: FormGroup | undefined;
  public organismoDto!: organismoDto;
  public disableButton: boolean = false;
  public isAlert: boolean = false;
  public correct: boolean = false;
  public errorMessage: boolean = false;
  public errorFound: boolean = false;
  public name: string = '';
  public tableData: any[] = [];
  public ids: number[] = [];
  public codigoNewOrganismo: number = 0;
  public listFiltered: any[] = [];
  public id!: number;
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
    this.fetchOrganismos();
  }

  postOrganismo(form: any) {
    this.organismoDto = form.value;
    this.organismoDto.nombre = form.value.nombre;
    this.organismoDto.estado = 1;
    this.organismoService.postOrganismos(this.organismoDto).subscribe(
      (response) => {
        this.correct = true;
        this.disableButton = true;
        setTimeout(() => {
          this.router.navigate(['../'], { relativeTo: this.route });
        }, 2000);
      },
      (error) => {
        this.errorFound = true;
      }
    );
  }

  fetchOrganismos() {
    this.organismoService.getOrganismo().subscribe((response) => {
      this.tableData = response.content;
      this.ids = this.tableData.map((item) => item.id).sort((a, b) => a - b);
      this.codigoNewOrganismo = this.ids[this.ids.length - 1] + 1;
      this.listFiltered = this.tableData;
    });
  }

  redirectToPage() {
    this.router.navigate(['../'], { relativeTo: this.route });
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
}
