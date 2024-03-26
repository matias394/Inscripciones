import { ListaDesplegable } from '../lista-desplegable';
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CampoTipoFormulario } from '../../../modelos/campo-tipo-formulario';

@Component({
  selector: 'app-campo-lista-desplegable',
  templateUrl: './campo-lista-desplegable.component.html',
  styleUrls: ['./campo-lista-desplegable.component.css']
})
export class CampoListaDesplegableComponent extends CampoTipoFormulario implements OnInit {

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

  actualizarVista(modelo: ListaDesplegable): void {
    this.vista = {
      nombre: modelo.nombre,
      etiqueta: modelo.etiqueta + (modelo.esObligatorio ? ' *' : ''),
      descripcion: modelo.descripcion,
      placeholder: modelo.placeholder,
    };
    this.changeDetectorRef.detectChanges();
  }
}
