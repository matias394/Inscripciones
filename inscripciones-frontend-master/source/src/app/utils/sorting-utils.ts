export function sortByCategoria(a, b) {
  return a.categoria.toString().localeCompare(b.categoria.toString());
}

export function sortByName(a, b) {
  return a.nombre.toString().localeCompare(b.nombre.toString());
}
