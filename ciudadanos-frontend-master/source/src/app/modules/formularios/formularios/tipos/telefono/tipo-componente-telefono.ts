import { ModalTelefonoComponent } from './modal-telefono/modal-telefono.component';
import { ComponenteFormulario } from '../../modelos/componente-formulario';
import { CampoTelefonoComponent } from './campo-telefono/campo-telefono.component';

export const TIPO_COMPONENTE_TELEFONO: ComponenteFormulario = {
    campo: CampoTelefonoComponent,
    modal: ModalTelefonoComponent
};
