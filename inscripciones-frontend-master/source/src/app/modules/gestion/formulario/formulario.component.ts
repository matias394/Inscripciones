import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrevisualizandoFormularioComponent } from '@modules/formularios/formularios/componentes/previsualizando-formulario/previsualizando-formulario.component';
import { TokenStorageService } from '@modules/auth/token-storage.service';
import { FormulariosService2 } from '@shared/services/formularios.service';
import { SharedService } from '@shared/services/shared.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent {
  @ViewChild(PrevisualizandoFormularioComponent, { static: false })
  childComponentRef: PrevisualizandoFormularioComponent;

  public stepIsActive: boolean = true;
  public isAlert: boolean = false;
  public correct: boolean = false;
  public errorMessage: boolean = false;
  public errorFound: boolean = false;
  public formResult: any;
  public formId: string = '';
  public inscripcionId: string;
  public instanciaId: string;
  public error: boolean = false;
  public message: string;
  public resultSaved: boolean = false;
  public cuil: string;
  public cantidadCuposUsuario: number = 0;
  public cantidadCuposInscripcion: number = 0;
  public infoInscripcion: any = null;
  public user: any;
  public activeStep: number = 1;
  public instancia: any;
  public nombreCurso: string;
  public instanciaSede: any;
  public showForm: boolean = false;

  constructor(
    private formulariosService: FormulariosService2,
    private inscripcionesServices: SharedService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenService: TokenStorageService,
    private location: Location
  ) {}

  ngOnInit(): void {
    // console.log('formulariosService :>> ');
    this.inscripcionId = this.tokenService.getInscription().id;
    // this.instancia = this.tokenService.getInstancia();
    this.instanciaSede = this.tokenService.getInstanciaSede();
    // this.nombreCurso = this.instancia.nombre;
    this.nombreCurso = this.instanciaSede.nombreInscripcion;
    this.instanciaId = this.instanciaSede.idInstancia;
    this.loadForm();
  }

  closeAlert() {
    this.isAlert = false;
  }

  loadForm() {
    this.formulariosService
      .getFormByIdInscripcion(this.inscripcionId)
      .subscribe({
        next: (response) => {
          this.formId = response.idRefMongo;
          this.tokenService.saveFormId(this.formId);
          this.showForm = true;
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  getFormResult(formResult: any) {
    this.formResult = formResult;
    this.sendNext(formResult);
  }

  goBack() {
    this.activeStep = this.activeStep - 1;
    this.stepIsActive = true;
    sessionStorage.removeItem('inscribir')
    this.location.back();
  }

  nextStep() {
    console.log('this.formIsValidated() :>> ', this.formIsValidated());
    if (this.formIsValidated()) {
      this.activeStep = this.activeStep + 2;
      this.stepIsActive = true;
      sessionStorage.removeItem('inscribir')
    }
  }

  formIsValidated(): boolean {
    console.log(
      'this.childComponentRef.isFormValid :>> ',
      this.childComponentRef.isFormValid()
    );
    console.log(
      'this.childComponentRef.esPosibleAvanzarSeccion() :>> ',
      this.childComponentRef.esPosibleAvanzarSeccion()
    );
    return (
      this.childComponentRef.isFormValid() &&
      !this.childComponentRef.esPosibleAvanzarSeccion()
    );
  }

  sendNext(form: any) {
    this.tokenService.saveForm(form);
    this.router.navigate(['confirmar'], {
      relativeTo: this.route,
    });
  }
}
