import { ModeloCampoFormulario } from '../modelo-campo-formulario';

export interface AbrirModalEvent {
  tipo: string;
  tab: 'general' | 'validaciones' | 'visibilidad' | 'conceptos';
  // si el modelo esta presente, el modal se abre en modo edicion
  modelo?: ModeloCampoFormulario;
}
