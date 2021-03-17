import { catchError } from 'rxjs/operators';
import { IonList, IonSearchbar } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Pedido } from './../../models/pedido';
import { AlertService } from './../../../../shared/services/alert.service';
import { Router } from '@angular/router';
import { PedidosService } from './../../services/pedidos.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-list-entregados',
  templateUrl: './list-entregados.component.html',
  styleUrls: ['./list-entregados.component.scss'],
})
export class ListEntregadosComponent implements OnInit {


  @ViewChild('listadoEntregados') listadoEntregados: IonList;
  @ViewChild('termino') terminoBusqueda: IonSearchbar;

  entregados$: Observable<Pedido[]>;
  error = null;

  constructor(
    private pedidosService: PedidosService,
    private router: Router,
    private alertService: AlertService,
  ) {

  }

  borrar(id: string | number) {
    this.listadoEntregados.closeSlidingItems();
    this.alertService.mostrar(
      () => { this.pedidosService.delete$(id).subscribe(r => this.ionViewWillEnter()) },
      () => { },
    );
  }

  show(id?: string | number) {
    this.listadoEntregados.closeSlidingItems();
    id = id ? '/' + id : '';
    this.router.navigateByUrl('pedidos/show' + id);
  }

  ionViewWillEnter(event?: any) {
    this.error = null;
    this.entregados$ = this.pedidosService.getAll$('entregados')
    .pipe(catchError(err => this.error = err));
    if (event) { event.target.complete(); }
  }

  ngOnInit() { }

}
