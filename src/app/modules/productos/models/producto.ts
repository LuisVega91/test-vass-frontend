import { Kardex } from './../../kardex/models/Kardex';
export class Producto {
  id: number = 0;
  articulo: string
  referencia: string = "REF";
  localizacion: string;
  tipo_unidad: number;
  minimo: number;
  maximo: number;
  id_proveedor: number;
  deleted_at: string;
  created_at: string;
  updated_at: string;
  detalle: Kardex;
}
