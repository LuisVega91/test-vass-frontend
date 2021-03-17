import { PedidosService } from './../../services/pedidos.service';
import { Pedido } from './../../models/pedido';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AlertService } from './../../../../shared/services/alert.service';
import { IonSearchbar, IonList } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-list-pendientes',
  templateUrl: './list-pendientes.component.html',
  styleUrls: ['./list-pendientes.component.scss'],
})
export class ListPendientesComponent implements OnInit {


  @ViewChild('listadoPendientes') listadoPendientes: IonList;
  @ViewChild('termino') terminoBusqueda: IonSearchbar;

  pendientes$: Observable<Pedido[]>;
  error = null;

  constructor(
    private pedidosService: PedidosService,
    private router: Router,
    private alertService: AlertService,
  ) {

  }

  borrar(id: string | number) {
    this.listadoPendientes.closeSlidingItems();
    this.alertService.mostrar(
      () => { this.pedidosService.delete$(id).subscribe(r => this.ionViewWillEnter()) },
      () => { },
    );
  }

  show(id?: string | number) {
    this.listadoPendientes.closeSlidingItems();
    id = id ? '/' + id : '';
    this.router.navigateByUrl('pedidos/show' + id);
  }

  ionViewWillEnter(event?: any) {
    this.error = null;
    this.pendientes$ = this.pedidosService.getAll$('pendientes')
    .pipe(catchError(err => this.error = err));
    if (event) { event.target.complete(); }
  }

  ngOnInit() { }

}
