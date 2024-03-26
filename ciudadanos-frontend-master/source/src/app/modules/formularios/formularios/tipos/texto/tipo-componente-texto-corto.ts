import { ComponenteFormulario } from '../../modelos/componente-formulario';
import { ModalTextoCortoComponent } from './modal-texto-corto/modal-texto-corto.component';
import { CampoTextoComponent } from './campo-texto/campo-texto.component';


export const TIPO_COMPONENTE_TEXTO_CORTO: ComponenteFormulario = {
  campo: CampoTextoComponent,
  modal: ModalTextoCortoComponent
};
