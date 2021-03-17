import { Pedido } from './../models/pedido';
import { map } from 'rxjs/operators';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  url = environment.url + 'pedidos';

  httpOptions = {
    params: new HttpParams().append('', ''),
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  get$(id) {
    return this.http.get<any>( this.url + `/${id}`, this.httpOptions)
      .pipe(map(resp => resp.data))
      .pipe(map(resp => resp === null ? [] : resp));
  }

  getAll$(estado: string= null) {
    const httpOptions = {
      params: new HttpParams().append('estado', estado),
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.get<any>( this.url, httpOptions)
      .pipe(map(resp => resp.data))
      .pipe(map(resp => resp === null ? [] : resp));
  }

  delete$(id) {
    return this.http.delete<any>(this.url + `/${id}`, this.httpOptions)
      .pipe(map(resp => resp.data))
      .pipe(map(resp => resp === null ? [] : resp));
  }

  update$(pedido) {
    return this.http.put<any>(this.url +`/${pedido.id}`, pedido, this.httpOptions)
  }

  create$(pedido: Pedido) {
    return this.http.post<any>(this.url, pedido, this.httpOptions)
  }

}
