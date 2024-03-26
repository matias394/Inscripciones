export interface rolesDto {
  id: number;
  nombre: string;
  descripcion: string;
  estado: number;
  permisos: [number];
}
