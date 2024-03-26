import { ComponenteFormulario } from '../../modelos/componente-formulario';
import { CampoArchivoComponent } from './campo-archivo/campo-archivo.component';
import { ModalArchivoComponent } from './modal-archivo/modal-archivo.component';

export const TIPO_COMPONENTE_ARCHIVO: ComponenteFormulario = {
  campo: CampoArchivoComponent,
  modal: ModalArchivoComponent
};
