import { ComponenteFormulario } from '../../modelos/componente-formulario';
import { ModalSelectorMultipleComponent } from './modal-selector-multiple/modal-selector-multiple.component';
import { CampoSelectorMultipleComponent } from './campo-selector-multiple/campo-selector-multiple.component';

export const TIPO_COMPONENTE_SELECTOR_MULTIPLE: ComponenteFormulario = {
    campo: CampoSelectorMultipleComponent,
    modal: ModalSelectorMultipleComponent
};
