export class  ModeloArchivo {
  nombre: string;
  content: string;
  path: string;
  tamanho: string;
  acceptTypes: string[];

  constructor() {
    this.nombre = '';
    this.content = '';
    this.path = '';
    this.tamanho = '';
    this.acceptTypes = [];
  }
}
