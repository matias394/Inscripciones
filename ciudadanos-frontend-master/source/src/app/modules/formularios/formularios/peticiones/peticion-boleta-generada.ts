export class PeticionBoletaGenerada {
  total: string;
  imagen: string;
  fechaVencimiento: string;
  boletaId: string;
  boletaNumero: string;
  boletaConcepto: string;
  opcionMedioPago: string;

  constructor(
    total,
    imagen,
    fechaVencimiento,
    boletaId,
    boletaNumero,
    boletaConcepto,
    opcionMedioPago,
  ) {
    this.total = total
    this.imagen = imagen;
    this.fechaVencimiento = fechaVencimiento;
    this.boletaId = boletaId;
    this.boletaNumero = boletaNumero;
    this.boletaConcepto = boletaConcepto;
    this.opcionMedioPago = opcionMedioPago;
  }
}
