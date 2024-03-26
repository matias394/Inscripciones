import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CampoTipoFormulario } from '../../../modelos/campo-tipo-formulario';
import { DireccionCaba } from '../direccion-caba';

@Component({
  selector: 'app-campo-direccion-caba',
  templateUrl: './campo-direccion-caba.component.html',
  styleUrls: ['./campo-direccion-caba.component.css']
})
export class CampoDireccionCabaComponent extends CampoTipoFormulario implements OnInit {

  vista = {};

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.changeDetectorRef.detach();
  }

  actualizarVista(modelo: DireccionCaba): void {
    this.vista = {};
    this.changeDetectorRef.detectChanges();
  }
}
