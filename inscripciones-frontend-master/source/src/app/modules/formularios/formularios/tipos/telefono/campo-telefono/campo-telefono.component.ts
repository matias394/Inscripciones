import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CampoTipoFormulario } from '../../../modelos/campo-tipo-formulario';
import { ModeloTelefono } from '../modelo-telefono';

@Component({
  selector: 'app-campo-telefono',
  templateUrl: './campo-telefono.component.html',
  styleUrls: ['./campo-telefono.component.css']
})
export class CampoTelefonoComponent extends CampoTipoFormulario implements OnInit {

  vista: {
    etiqueta?: string;
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

  actualizarVista(modelo: ModeloTelefono) {
    this.vista = {
      etiqueta: modelo.etiqueta + (modelo.esObligatorio ? ' *' : ''),
      descripcion: modelo.descripcion,
    };
    this.changeDetectorRef.detectChanges();
  }

}
