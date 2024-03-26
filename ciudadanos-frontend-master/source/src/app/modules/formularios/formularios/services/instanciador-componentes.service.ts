import { TIPOS_COMPONENTES_FORMULARIOS_DIPONIBLES } from './../tipos/tipos-componentes-formularios-disponibles';
import { Injectable, ComponentFactoryResolver, ComponentFactory, Type, ComponentRef } from '@angular/core';
import { ComponenteDinamicoDirective } from '../directivas/componente-dinamico.directive';
import { ModalComponenteFormulario } from '../modelos/modal-tipo-componente';
import { CampoTipoFormulario } from '../modelos/campo-tipo-formulario';


@Injectable({
  providedIn: 'root'
})
export class InstanciadorComponentesService {

  constructor(
    private resolver: ComponentFactoryResolver
  ) { }

  instanciarModal(template: ComponenteDinamicoDirective, key: string): ModalComponenteFormulario {
    const modal = TIPOS_COMPONENTES_FORMULARIOS_DIPONIBLES[key].modal;
    const modalComponent: ComponentRef<ModalComponenteFormulario> = this.instanciarComponente(template, modal);
    return modalComponent.instance;
  }

  instanciarCampo(template: ComponenteDinamicoDirective, key: string): CampoTipoFormulario {
    const campo = TIPOS_COMPONENTES_FORMULARIOS_DIPONIBLES[key].campo;
    const campoComponent: ComponentRef<CampoTipoFormulario> = this.instanciarComponente(template, campo);
    return campoComponent.instance;
  }

  private instanciarComponente(template: ComponenteDinamicoDirective, componente: Type<ModalComponenteFormulario | CampoTipoFormulario>): any {
    const componentFactory: ComponentFactory<ModalComponenteFormulario | CampoTipoFormulario> = this.resolver.resolveComponentFactory(componente);
    const viewContainerRef = template.viewContainerRef;
    viewContainerRef.clear();
    return viewContainerRef.createComponent(componentFactory);
  }
}
