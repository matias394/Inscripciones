export interface usuarioDto {
  id: number;
  nombre: string;
  cuil: string;
  apellido: string;
  email: string;
  dni: string;
  contrasena: string;
  genero: string;
  nacionalidad: string;
  categoria: any[any];
  estado: number;
  organismo: number;
  rol: number;
  intentos: 0;
}
