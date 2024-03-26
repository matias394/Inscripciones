import { Type } from '@angular/core';
import { ModalComponenteFormulario } from './modal-tipo-componente';
import { CampoTipoFormulario } from './campo-tipo-formulario';
/**
 * El componente de un formulario es un wrapper para el modal y el campo del formulario
 */

export interface ComponenteFormulario {
  modal: Type<ModalComponenteFormulario>;
  campo: Type<CampoTipoFormulario>;
}
