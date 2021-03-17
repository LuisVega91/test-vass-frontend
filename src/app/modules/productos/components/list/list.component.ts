import { AlertService } from './../../../../shared/services/alert.service';
import { ProductosService } from './../../services/productos.service';
import { Producto } from './../../models/producto';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList, IonSearchbar } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  @ViewChild('listadoProductos') listadoProductos: IonList;
  @ViewChild('termino') terminoBusqueda: IonSearchbar;

  productos$: Observable<Producto[]>;
  error = null;

  constructor(
    private productosService: ProductosService,
    private router: Router,
    private alertService: AlertService,
  ) {

  }

  delete(id: string | number) {
    this.listadoProductos.closeSlidingItems();
    this.alertService.mostrar(
      () => { this.productosService.delete$(id).subscribe(r => this.ionViewWillEnter()) },
      () => { },
    );
  }

  form(id?: string | number) {
    this.listadoProductos.closeSlidingItems();
    id = id ? '/' + id : '';
    this.router.navigateByUrl('productos/form' + id);
  }

  ionViewWillEnter(event?: any) {
    this.error = null;
    this.productos$ = this.productosService.getAll$()
    .pipe(catchError(err => this.error = err));
    if (event) { event.target.complete(); }
  }

  ngOnInit() { }

}
