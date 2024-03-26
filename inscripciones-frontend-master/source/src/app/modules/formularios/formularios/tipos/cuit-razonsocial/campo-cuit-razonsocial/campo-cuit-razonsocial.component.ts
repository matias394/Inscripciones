import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CampoTipoFormulario } from '../../../modelos/campo-tipo-formulario';
import { CuitRazonSocial } from '../cuit-razonsocial';

@Component({
  selector: 'app-campo-cuit-razonsocial',
  templateUrl: './campo-cuit-razonsocial.component.html',
  styleUrls: ['./campo-cuit-razonsocial.component.css']
})
export class CampoCuitRazonsocialComponent  extends CampoTipoFormulario  implements OnInit {

  vista: {
    esObligatorio?: string;
    nombreCuit?: string;
    nombreRazonSocial?: string;
  } = {};

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.changeDetectorRef.detach();
  }

  actualizarVista(modelo: CuitRazonSocial): void {
    this.vista = {
      esObligatorio: modelo.esObligatorio ? ' *' : '',
      nombreCuit: modelo.nombreCuit,
      nombreRazonSocial: modelo.nombreRazonSocial,
    };
    this.changeDetectorRef.detectChanges();
  }
}
