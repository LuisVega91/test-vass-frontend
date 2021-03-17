export class Inventario {

  id: number = 0;
  producto_id: string;
  proveedor_id: string;
  cantidad: string;
  deleted_at: null;
  created_at: string;
  updated_at: string;
  producto: {
    id: number;
    nombre: string;
    valor: string;
    deleted_at: null;
    created_at: string;
    updated_at: string
  };
  proveedor: {
    id: number;
    nombre: string;
    deleted_at: null;
    created_at: string;
    updated_at: string
  }

}





