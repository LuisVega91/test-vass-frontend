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
  detalle: {
    id: number;
    descripcion: string;
    valor_unitario: number;
    entrada_cantidad: number;
    entrada_valor: number;
    salida_cantidad: number;
    salida_valor: number;
    saldo_cantidad: number;
    saldo_valor: number;
    devuelto: number;
    id_producto: number;
    deleted_at: string;
    created_at: string;
    updated_at: string;
  };
}
