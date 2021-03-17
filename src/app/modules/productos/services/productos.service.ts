import { Producto } from './../models/producto';
import { environment } from './../../../../environments/environment.prod';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  url = environment.url + 'productos';

  httpOptions = {
    params: new HttpParams().append('', ''),
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  get$(id) {

    return id == null ? of(new Producto) : this.http.get<any>( this.url + `/${id}`, this.httpOptions)
      .pipe(map(resp => resp.data))
      .pipe(map(resp => resp === null ? [] : resp));
  }

  getAll$() {
    return this.http.get<any>(this.url , this.httpOptions)
      .pipe(map(resp => resp.data))
      .pipe(map(resp => resp === null ? [] : resp));
  }

  delete$(id) {
    return this.http.delete<any>(this.url + `/${id}`, this.httpOptions)
      .pipe(map(resp => resp.data))
      .pipe(map(resp => resp === null ? [] : resp));
  }

  update$(producto: Producto) {
    return this.http.put<any>(this.url +`/${producto.id}`, producto, this.httpOptions)
  }

  create$(producto: Producto) {
    return this.http.post<any>(this.url, producto, this.httpOptions)
  }

}
