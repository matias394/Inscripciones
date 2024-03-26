import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CampoTipoFormulario } from '../../../modelos/campo-tipo-formulario';
import { Texto } from '../texto';

@Component({
  selector: 'app-campo-texto',
  templateUrl: './campo-texto.component.html',
  styleUrls: ['./campo-texto.component.css']
})
export class CampoTextoComponent extends CampoTipoFormulario implements OnInit {

   vista: {
    nombre?: string;
    etiqueta?: string;
    descripcion?: string;
    valorPorDefecto?: string;
    placeholder?: string;
  } = {};

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.changeDetectorRef.detach();
  }

   actualizarVista(modelo: Texto) {
    this.vista = {
      nombre: modelo.nombre,
      etiqueta: modelo.etiqueta + (modelo.esObligatorio ? ' *' : ''),
      descripcion: modelo.descripcion,
      valorPorDefecto: modelo.valorPorDefecto || '',
      placeholder: modelo.placeholder || '',
    };
    this.changeDetectorRef.detectChanges();
  }
}
