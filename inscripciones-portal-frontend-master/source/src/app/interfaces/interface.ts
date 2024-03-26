export interface ListOrganismo {
  id: number;
  nombre: string;
  estado: number;
  icon: string;
}

export interface ListOrganismos extends Array<ListOrganismo> {}

export interface Organization {
  id: number;
  nombre?: string;
  url?: string;
}

export interface Sedes {
  id: number;
  nombre: string;
  direccion: string;
  piso: string;
}

export interface Colony {
  id: number;
  nombre: string;
  url: string;
  sedes: Array<Sedes>;
}

export interface ListCategory {
  estado: number;
  id: number;
  nivel: string;
  nombre: string;
  nombreOrganismo: string;
  organismoId: number;
  padreId: string;
  seq: string;
  icon: string;
}

export interface ListCategories extends Array<ListCategory> {}

export interface ListColony extends Array<Colony> {}
