
import { ComponenteFormulario } from '../../modelos/componente-formulario';
import { CampoListaDesplegableComponent } from './campo-lista-desplegable/campo-lista-desplegable.component';
import { ModalListaDesplegableConFiltroComponent } from './modal-lista-desplegable-con-filtro/modal-lista-desplegable-con-filtro.component';

export const TIPO_COMPONENTE_LISTA_DESPLEGABLE_FILTRO: ComponenteFormulario = {
  campo: CampoListaDesplegableComponent,
  modal: ModalListaDesplegableConFiltroComponent
};
