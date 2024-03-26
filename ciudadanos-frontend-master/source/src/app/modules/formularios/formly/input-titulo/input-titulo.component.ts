import { Component, OnInit, OnDestroy } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';
import { FormControl } from '@angular/forms';
import { VisibilidadComponenteFormlyService } from "../../formularios/services/visibilidad-componente-formly.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-input-titulo',
  templateUrl: './input-titulo.component.html',
  styleUrls: ['./input-titulo.component.css']
})
export class InputTituloComponent extends FieldType implements OnInit, OnDestroy {
  tipo: string;
  titulo: string;
  override field: FormlyFieldConfig;

  mostrarElementoSubscription: Subscription;
  mostrarElemento: boolean;

  constructor(private visibilidadComponenteFormlyService: VisibilidadComponenteFormlyService) {
    super();
  }

  ngOnInit() {
    this.subscribirMostrarElemento();
    this.tipo = this.field.templateOptions['tipo'];
    this.titulo =  `<${this.tipo}>${this.field.templateOptions['titulo']}</${this.tipo}>`;
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
