import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CampoTipoFormulario } from '../../../modelos/campo-tipo-formulario';
import { GrupoIterativo } from '../grupo-iterativo';
import { takeUntil, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-campo-grupo-iterativo',
  templateUrl: './campo-grupo-iterativo.component.html',
  styleUrls: ['./campo-grupo-iterativo.component.css']
})
export class CampoGrupoIterativoComponent extends CampoTipoFormulario implements OnInit {

  override modelo: GrupoIterativo;

  vista: {
    nombre?: string;
    etiqueta?: string;
    descripcion?: string;
  } = {};

  camposEnGrilla: string[] = [];

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.changeDetectorRef.detach();
  }

  actualizarVista(modelo: GrupoIterativo): void {
    this.vista = {
      nombre: modelo.nombre,
      etiqueta: modelo.etiqueta + (modelo.esObligatorio ? ' *' : ''),
      descripcion: modelo.descripcion,
    };
    this.changeDetectorRef.detectChanges();
  }

  actualizarCamposEnGrilla(modelo: GrupoIterativo) {
    this.camposEnGrilla = modelo.camposEnGrilla().map(
      campo => campo.etiqueta
    );
    this.changeDetectorRef.detectChanges();
  }

  override setModelo(modelo: GrupoIterativo) {
    super.setModelo(modelo);
    // @ts-ignore
    modelo.cambiosEnLaGrilla().pipe(
      startWith(this.modelo),
      //takeUntil(this.destroyed$)
    ).subscribe(
      () => this.actualizarCamposEnGrilla(this.modelo)
    );
  }
}
