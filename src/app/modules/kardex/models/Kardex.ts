export class Kardex {
  id: number;
  descripcion: string;

  valor_unitario: number;
  entrada_cantidad: number;
  entrada_valor: number;
  salida_cantidad: number;
  salida_valor: number;
  saldo_cantidad: number;
  saldo_valor: number;

  id_producto: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  devuelto: string;
  mostrar: boolean = false;

};
