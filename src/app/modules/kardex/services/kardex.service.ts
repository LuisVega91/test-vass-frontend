import { Kardex } from './../models/Kardex';
import { environment } from './../../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KardexService {

  url = environment.url + 'detalleProducto';

  httpOptions = {
    params: new HttpParams().append('', ''),
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getByIdProducto$(id) {

  const httpOptions = {
    params: new HttpParams().append('id_producto', id),
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

    return this.http.get<any>( this.url, httpOptions)
      .pipe(map(resp => resp.data))
      .pipe(map(resp => resp === null ? [] : resp));
  }

  getAll$() {
    return this.http.get<any>(this.url , this.httpOptions)
      .pipe(map(resp => resp.data))
      .pipe(map(resp => resp === null ? [] : resp));
  }

  compra$(kardex: object) {
    return this.http.post<any>(this.url + '/compra', kardex, this.httpOptions)
  }
  devolucionCompra$(kardex: object) {
    return this.http.put<any>(this.url + '/compra', kardex, this.httpOptions)
  }
  venta$(kardex: object) {
    return this.http.put<any>(this.url + '/venta', kardex, this.httpOptions)
  }
  devolucionVenta$(kardex: object) {
    return this.http.put<any>(this.url + '/venta', kardex, this.httpOptions)
  }

}
