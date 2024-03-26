import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CampoTipoFormulario } from '../../../modelos/campo-tipo-formulario';
import { Fecha } from '../fecha';

@Component({
  selector: 'app-campo-fecha',
  templateUrl: './campo-fecha.component.html',
  styleUrls: ['./campo-fecha.component.css']
})
export class CampoFechaComponent extends CampoTipoFormulario implements OnInit {

  vista: {
    nombre?: string;
    etiqueta?: string;
    descripcion?: string;
    valorPorDefecto?: string;
  } = {};

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.changeDetectorRef.detach();
  }

  actualizarVista(modelo: Fecha): void {
    this.vista = {
      nombre: modelo.nombre,
      etiqueta: modelo.etiqueta + (modelo.esObligatorio ? ' *' : ''),
      descripcion: modelo.descripcion,
      valorPorDefecto: modelo.valorPorDefecto,
    };
    this.changeDetectorRef.detectChanges();
  }
}
