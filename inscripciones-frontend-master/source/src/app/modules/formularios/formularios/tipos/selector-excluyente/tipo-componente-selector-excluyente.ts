import { ComponenteFormulario } from '../../modelos/componente-formulario';
import { ModalSelectorExcluyenteComponent } from './modal-selector-excluyente/modal-selector-excluyente.component';
import { CampoSelectorExcluyenteComponent } from './campo-selector-excluyente/campo-selector-excluyente.component';

export const TIPO_COMPONENTE_SELECTOR_EXCLUYENTE: ComponenteFormulario = {
    campo: CampoSelectorExcluyenteComponent,
    modal: ModalSelectorExcluyenteComponent
};
