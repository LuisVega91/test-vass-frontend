import { Producto } from './../../../productos/models/producto';
import { ProductosService } from './../../../productos/services/productos.service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Kardex } from './../../models/Kardex';
import { AlertService } from './../../../../shared/services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { KardexService } from './../../services/kardex.service';
import { IonList } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  @ViewChild('listadoKardex') listadoKardex: IonList;

  kardex$: Observable<Kardex[]>;
  productos: Producto[] = [];
  error = null;
  id_producto: number = null;

  constructor(
    private kardexService: KardexService,
    private route: ActivatedRoute,
    private productosService: ProductosService,
    private router: Router,
    private alertService: AlertService,
  ) { }

  devolucion(id, isCompra, descripcion) {
    this.listadoKardex.closeSlidingItems();
    const inputs = [{
      name: 'descripcion',
      type: 'text',
      placeholder: 'Descripcion',
      value: 'Devolucion ' + descripcion,
    }];
    this.alertService.mostrar(
      (data) => {
        let peticion$: Observable<any>;
        if (isCompra) {
          peticion$ = this.kardexService.devolucionCompra$({ id, descripcion: data.descripcion, });
        } else {
          peticion$ = this.kardexService.devolucionVenta$({ id, descripcion: data.descripcion, });
        }
        peticion$.subscribe(r => {
          this.ionViewWillEnter();
        });
      },
      () => { },
      'Devolucion',
      'Digite descripcion de la Devolucion',
      undefined,
      undefined,
      false,
      undefined,
      inputs
    );
  }

  form(tipo, id?: string | number) {
    this.listadoKardex.closeSlidingItems();
    id = id ? '/' + id : '';
    this.router.navigateByUrl('kardex/form/'+ tipo + id);
  }

  ionViewWillEnter(event?: any) {
    const id = this.route.snapshot.paramMap.get('id_producto');
    if(id){
      this.id_producto = Number(id);
    }
    this.error = null;
    if (this.id_producto) {
      this.kardex$ = this.kardexService.getByIdProducto$(this.id_producto)
        .pipe(catchError(err => this.error = err));
    } else {
      this.kardex$ = this.kardexService.getAll$()
        .pipe(catchError(err => this.error = err));
    }
    this.productosService.getAll$()
      .pipe(catchError(err => this.error = err))
      .subscribe(r => this.productos = r);

    if (event) { event.target.complete(); }
  }

  ngOnInit() { }

}
