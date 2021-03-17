import { Proveedor } from './../../proveedores/models/proveedor';
import { Inventario } from './../models/inventario';
import { environment } from './../../../../environments/environment.prod';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventariosService {

  url = environment.url + 'inventario';

  httpOptions = {
    params: new HttpParams().append('', ''),
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  get$(id) {
    return !id ? of(new Proveedor())
    : this.http.get<any>( this.url + `/${id}`, this.httpOptions)
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

  update$(inventario: Inventario) {
    return this.http.put<any>(this.url +`/${inventario.id}`, inventario, this.httpOptions)
  }

  create$(inventario: Inventario) {
    return this.http.post<any>(this.url, inventario, this.httpOptions)
  }

}
