import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CampoTipoFormulario } from '../../../modelos/campo-tipo-formulario';
import { Archivo } from '../archivo';

@Component({
  selector: 'app-campo-archivo',
  templateUrl: './campo-archivo.component.html',
  styleUrls: ['./campo-archivo.component.css']
})
export class CampoArchivoComponent extends CampoTipoFormulario implements OnInit {

  vista: {
    nombre?: string;
    etiqueta?: string;
    descripcion?: string;
    archivoNuevo?: boolean;
  } = {};

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super();
  }


  ngOnInit() {
    this.changeDetectorRef.detach();
  }

  actualizarVista(modelo: Archivo): void {
    this.vista = {
      nombre: modelo.nombre,
      etiqueta: modelo.etiqueta + (modelo.esObligatorio ? ' *' : ''),
      descripcion: modelo.descripcion,
      archivoNuevo: modelo.esArchivoNuevo,
    };
    this.changeDetectorRef.detectChanges();
  }
}
