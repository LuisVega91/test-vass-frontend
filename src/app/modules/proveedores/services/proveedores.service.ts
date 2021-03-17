import { Proveedor } from './../models/proveedor';
import { environment } from './../../../../environments/environment.prod';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  url = environment.url + 'proveedores';

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

  update$(proveedor: Proveedor) {
    return this.http.put<any>(this.url +`/${proveedor.id}`, proveedor, this.httpOptions)
  }

  create$(proveedor: Proveedor) {
    return this.http.post<any>(this.url, proveedor, this.httpOptions)
  }

}
