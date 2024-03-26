import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CampoTipoFormulario } from '../../../modelos/campo-tipo-formulario';
import { SelectorMultiple } from '../selector-multiple';

@Component({
  selector: 'app-campo-selector-multiple',
  templateUrl: './campo-selector-multiple.component.html',
  styleUrls: ['./campo-selector-multiple.component.css']
})
export class CampoSelectorMultipleComponent extends CampoTipoFormulario implements OnInit {

  vista: {
    nombre?: string;
    etiqueta?: string;
    descripcion?: string;
    valores?: {
      descripcion: string;
      seleccionado: boolean;
    }[];
  } = {};

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.changeDetectorRef.detach();
  }

  actualizarVista(modelo: SelectorMultiple) {
    const valoresPorDefecto = modelo.valoresPorDefecto;
    this.vista = {
      nombre: modelo.nombre,
      etiqueta: modelo.etiqueta + (modelo.esObligatorio ? ' *' : ''),
      descripcion: modelo.descripcion,
      valores: Array.isArray(modelo.valores) ? modelo.valores.map(
        valor => {
          return {
            descripcion: valor,
            seleccionado: valoresPorDefecto.some(vpd => vpd === valor)
          };
        }
      ) : [],
    };
    this.changeDetectorRef.detectChanges();
  }
}
