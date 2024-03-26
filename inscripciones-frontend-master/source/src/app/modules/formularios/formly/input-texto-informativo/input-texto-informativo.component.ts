import { Component, OnInit, OnDestroy } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { VisibilidadComponenteFormlyService } from "../../formularios/services/visibilidad-componente-formly.service";

@Component({
  selector: 'app-input-texto-informativo',
  templateUrl: './input-texto-informativo.component.html',
  styleUrls: ['./input-texto-informativo.component.css']
})
export class InputTextoInformativoComponent extends FieldType implements OnInit, OnDestroy {
  textoInformativo: string;

  mostrarElementoSubscription: Subscription;
  mostrarElemento: boolean;

  constructor(private visibilidadComponenteFormlyService: VisibilidadComponenteFormlyService) {
    super();
   }

  ngOnInit() {
    this.subscribirMostrarElemento();
    this.textoInformativo = this.field.templateOptions['textoHTML'];
  }

  subscribirMostrarElemento() {
    this.mostrarElementoSubscription = this.visibilidadComponenteFormlyService.crearSubscripcion().subscribe(() => {
      this.mostrarElemento = this.visibilidadComponenteFormlyService.mostrarElemento(this);
    });
    this.visibilidadComponenteFormlyService.notifySubscribers();
  }

  ngOnDestroy () {
    if (this.mostrarElementoSubscription) {
      this.mostrarElementoSubscription.unsubscribe();
    }
  }

}
