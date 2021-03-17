export class Pedido {
  id: number;
  referencia: string;
  entrego: string;
  total: string;
  deleted_at: string;
  created_at: string;
  updated_at: string;
  detalle: [
    {
      id: number;
      producto_id: string;
      pedido_id: string;
      cantidad: number;
      deleted_at: string;
      created_at: string;
      updated_at: string;
      producto: {
        id: number;
        nombre: string;
        valor: string;
        deleted_at: string;
        created_at: string;
        updated_at: string;
      };
      inventario: {
        id: 3,
        producto_id: string,
        proveedor_id: string,
        cantidad: number,
        deleted_at: string,
        created_at: string,
        updated_at: string,
        proveedor: {
          id: number,
          nombre: string;
          deleted_at: string,
          created_at: string;
          updated_at: string;
        }
      }
    }
  ]
}
