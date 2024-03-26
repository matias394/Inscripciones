import { Component, ViewChild, OnInit } from '@angular/core';
import { ComunicacionBarraSeccionesService } from '../../services/comunicacion-barra-secciones.service';
import { PopoverDirective } from 'ngx-bootstrap/popover';
import { takeUntil } from 'rxjs/operators';
//import { SuscripcionCancelable } from 'src/app/shared/modelo/suscripcion-cancelable';

@Component({
  selector: 'app-barra-componentes',
  templateUrl: './barra-componentes.component.html',
  styleUrls: ['./barra-componentes.component.css']
})
export class BarraComponentesComponent  implements OnInit {

  @ViewChild(PopoverDirective, { static: true }) popover: PopoverDirective;

  disabled = true;
  hasGrupoIterativo = false;
  esGrupoIterativoEditableOperador = false;

  constructor(
    private comunicacionBarraSeccionesService: ComunicacionBarraSeccionesService
  ) {
    //super();
  }

  ngOnInit() {
    this.comunicacionBarraSeccionesService.campoSeleccionado.pipe(
      //takeUntil(this.destroyed$)
    ).subscribe(
      () => {
        // verificamos que el campo seleccionado no pertenezca a un grupo iterativo
        // Si pertenece, solo mostramos los componentes que se pueden insertar dentro del grupo iterativo
        // Si pertenece a un grupo iterativo editable por el operador debe ocultar ciertos campos
        this.hasGrupoIterativo = this.comunicacionBarraSeccionesService.grupoIterativoActual != null;
        if (this.hasGrupoIterativo) {
          this.esGrupoIterativoEditableOperador = this.comunicacionBarraSeccionesService.grupoIterativoActual.esEditableOperador;
        }
      }
    );
  }

  onOcultarPopover(): void {

  }

  stopEvent(evt: Event) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  componenteSeleccionado(key: string): void {
    // creamos el modal para insertar un nuevo componente
    // el modal se abre en modo creacion y en la pestaña general
    this.comunicacionBarraSeccionesService.crearModal(key);
    //this.popover.hide();
  }

}
