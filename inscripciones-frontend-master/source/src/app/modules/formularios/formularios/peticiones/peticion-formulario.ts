import { Formulario } from '../modelos/formulario';
import { FormlyComponent } from '../modelos/formly-component';
import { TypeclassLocator } from '../modelos/typeclass-locator';

export class PeticionFormulario {

  id: number;
  nombre: string;
  campos: any[];

  constructor(formulario: Formulario | any) {
    this.id = formulario.id;
    this.nombre = formulario.nombre;
    // @ts-ignore
    this.campos = formulario.campos.map((campo: FormlyComponent) => {
      const clasePeticion = TypeclassLocator.buscarClase(campo.type);
      if (clasePeticion) {
        return new clasePeticion(campo);
      }
    });

  }
}
