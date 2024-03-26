import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CampoTipoFormulario } from '../../../modelos/campo-tipo-formulario';
import { SelectorExcluyente } from '../selector-excluyente';

@Component({
  selector: 'app-campo-selector-excluyente',
  templateUrl: './campo-selector-excluyente.component.html',
  styleUrls: ['./campo-selector-excluyente.component.css']
})
export class CampoSelectorExcluyenteComponent extends CampoTipoFormulario implements OnInit {

  vista: {
    nombre?: string;
    etiqueta?: string;
    descripcion?: string;
    valorPorDefecto?: string;
    valores?: string[];
  } = {};

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.changeDetectorRef.detach();
  }

  actualizarVista(modelo: SelectorExcluyente) {
    this.vista = {
      nombre: modelo.nombre,
      etiqueta: modelo.etiqueta + (modelo.esObligatorio ? ' *' : ''),
      descripcion: modelo.descripcion,
      valores: Array.isArray(modelo.valores) ? modelo.valores : [],
      valorPorDefecto: modelo.valorPorDefecto
    };
    this.changeDetectorRef.detectChanges();
  }
}
