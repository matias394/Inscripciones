import { ModeloCampoFormulario } from './modelo-campo-formulario';
import { ElementRef } from '@angular/core';

export interface CampoFormulario {
  selected: boolean;
  modelo: ModeloCampoFormulario;
  grupoIterativo?: boolean;
}

