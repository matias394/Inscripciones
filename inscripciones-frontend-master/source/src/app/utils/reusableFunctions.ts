export const findSedeNombre = (data: any[]): string => {
  const sedeNombre =
    data
      .flatMap((curso) =>
        curso.instanciaData.flatMap((instancia) =>
          instancia.instanciaSedeDataDTO.map((clase) => clase.nombreSede)
        )
      )
      .find((sedeNombre) => sedeNombre !== undefined) || 'Sede';

  return sedeNombre;
};

export const compararFechas = (a: any, b: any): number => {
  if (a.fecha < b.fecha) return -1;
  if (a.fecha > b.fecha) return 1;
  return a.id - b.id;
};
