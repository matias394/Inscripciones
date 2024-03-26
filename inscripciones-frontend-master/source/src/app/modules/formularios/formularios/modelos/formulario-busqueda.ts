export class FormularioBusqueda {
    id: number;
    nombre: string;
    tipoTramite: { nombre: string, estado: string };

    constructor(formulario: FormularioBusqueda = {} as any) {
        this.id = formulario.id;
        this.nombre = formulario.nombre;
        this.tipoTramite = formulario.tipoTramite;
    }

    get nombreTipoTramite(): string {
        return this.tipoTramite ? this.tipoTramite.nombre : '';
    }

    get estadoTipoTramite(): string {
        return this.tipoTramite ? this.tipoTramite.estado : '';
    }
}
