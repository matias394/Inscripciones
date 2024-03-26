import { FORMATOS_PERMITIDOS_TEXTO_INFORMATIVO } from '../texto-informativo';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CampoTipoFormulario } from '../../../modelos/campo-tipo-formulario';
import { TextoInformativo } from '../texto-informativo';

@Component({
  selector: 'app-campo-texto-informativo',
  templateUrl: './campo-texto-informativo.component.html',
  styleUrls: ['./campo-texto-informativo.component.css']
})
export class CampoTextoInformativoComponent extends CampoTipoFormulario implements OnInit {

  formatosPermitidos = FORMATOS_PERMITIDOS_TEXTO_INFORMATIVO;

  vista: {
    formato?: string;
    descripcion?: string;
  } = {};

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.changeDetectorRef.detach();
  }

  actualizarVista(modelo: TextoInformativo) {
    this.vista = {
      formato: modelo.formato,
      descripcion: modelo.descripcion,
    };
    this.changeDetectorRef.detectChanges();
  }
}
