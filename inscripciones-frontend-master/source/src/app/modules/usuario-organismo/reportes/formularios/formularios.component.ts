import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '@modules/auth/token-storage.service';
import { AmazonS3Service } from '@shared/services/amazonS3.service';
import { InscritoService } from '@shared/services/inscritos.service';

@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.component.html',
  styleUrls: ['./formularios.component.css'],
})
export class FormulariosComponent implements OnInit {
  public expandContent: boolean = false;
  public expandSecondContent: boolean = false;
  public selectedId: number = 0;
  public selectedIdTwo: any;
  public archivoExists: boolean;
  public archivo: any;
  public nombreCurso: string = '';
  public mongoID: String;
  public mongoIdCitizen: String;
  public formulario: any;
  public respuestaCiudadano: any;
  public formId: String;
  public formResult: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private inscritoService: InscritoService,
    private tokenService: TokenStorageService,
    private amazonService: AmazonS3Service
  ) {}

  ngOnInit() {
    this.mongoIdCitizen = this.router.url.split('/')[3];
    this.route.paramMap.subscribe((params) => {
      this.mongoID = params.get('id');
    });

    this.loadInscripcionDetalle(this.mongoIdCitizen);
  }

  loadInscripcionDetalle(mongoID) {
    this.inscritoService
      .getInscriptionDetalleByMongoID(mongoID)
      .subscribe((response) => {
        this.nombreCurso = response.nombreInscripcion;

        this.respuestaCiudadano = response.respuesta;

        this.formulario = JSON.parse(
          response.formData.campos.replace(/'/g, '"')
        );

        this.formId = this.mongoIdCitizen;

        if (response.respuesta.archivo != null) {
          const fileInfo = {
            cuil: this.tokenService.getUserManagement().cuil,
            inscripcion: this.tokenService.getUserManagement().inscriptionId,
            instancia: response.instanciaSedeId,
          };
          this.getAmazonFile(fileInfo);
        } else {
          this.archivoExists = false;
        }
      });
  }

  getSelectedDays(r) {
    let days = {
      lunes: r.lunes,
      martes: r.martes,
      miercoles: r.miercoles,
      jueves: r.jueves,
      viernes: r.viernes,
      sabado: r.sabado,
      domingo: r.domingo,
    };

    const selectedDays = Object.entries(days)
      .filter(([day, value]) => value === 1)
      .map(([day]) => day.slice(0, 1).toUpperCase() + day.slice(1, 3))
      .join(', ');

    return selectedDays;
  }

  getFormResult(formResult: any) {
    this.formResult = formResult;
  }

  getAmazonFile(amazonInfo: any) {
    this.amazonService.getAmazonFile(amazonInfo).subscribe((response) => {
      this.archivo = response;
      this.archivoExists = true;
    });
  }

  downloadDocument() {
    const blob = this.b64toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = this.archivo.fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }

  b64toBlob() {
    const byteCharacters = atob(this.archivo.base64);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: '' });
    return blob;
  }
}
