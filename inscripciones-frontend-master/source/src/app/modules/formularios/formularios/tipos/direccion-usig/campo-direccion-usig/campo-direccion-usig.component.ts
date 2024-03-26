import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CampoTipoFormulario } from '../../../modelos/campo-tipo-formulario';
import { DireccionUsig } from '../direccion-usig';

@Component({
  selector: 'app-campo-direccion-usig',
  templateUrl: './campo-direccion-usig.component.html',
  styleUrls: ['./campo-direccion-usig.component.css']
})
export class CampoDireccionUsigComponent extends CampoTipoFormulario implements OnInit {

  vista: {
    nombre?: string;
    etiqueta?: string;
    descripcion?: string;
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

  actualizarVista(modelo: DireccionUsig): void {
    this.vista = {
      nombre: modelo.nombre,
      etiqueta: modelo.etiqueta + (modelo.esObligatorio ? ' *' : ''),
      descripcion: modelo.descripcion,
      placeholder: modelo.placeholder ? modelo.placeholder : '',
    };
    this.changeDetectorRef.detectChanges();
  }

}
