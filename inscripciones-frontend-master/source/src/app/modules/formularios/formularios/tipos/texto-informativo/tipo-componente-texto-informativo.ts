import { ModalTextoInformativoComponent } from './modal-texto-informativo/modal-texto-informativo.component';
import { CampoTextoInformativoComponent } from './campo-texto-informativo/campo-texto-informativo.component';
import { ComponenteFormulario } from '../../modelos/componente-formulario';

export const TIPO_COMPONENTE_TEXTO_INFORMATIVO: ComponenteFormulario = {
  campo: CampoTextoInformativoComponent,
  modal: ModalTextoInformativoComponent
};
