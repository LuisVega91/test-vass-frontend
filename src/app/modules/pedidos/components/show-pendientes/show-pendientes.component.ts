import { HttpErrorResponse } from '@angular/common/http';
import { Pedido } from './../../models/pedido';
import { catchError } from 'rxjs/operators';
import { AlertService } from './../../../../shared/services/alert.service';
import { PedidosService } from './../../../pedidos/services/pedidos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-pendientes',
  templateUrl: './show-pendientes.component.html',
  styleUrls: ['./show-pendientes.component.scss'],
})
export class ShowPendientesComponent implements OnInit {

  pedido: Pedido = null;
  error: HttpErrorResponse = null;
  cargaCompleta = false;
  id: number = null;

  constructor(
    private route: ActivatedRoute,
    private pedidosService: PedidosService,
    private alertService: AlertService,
    private router: Router) {
    this.obtenerPedido();
  }

  obtenerPedido() {
    this.id = Number (this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.pedidosService.get$(this.id)
        .pipe(catchError(err => this.error = err))
        .subscribe(resp => {
          this.pedido = resp;
          this.cargaCompleta = true;
        });
    } else {
      this.pedido = new Pedido();
      this.cargaCompleta = true;
    }
  }



  entregar() {

    const pedido = { id: this.id, entrego: true };
    this.pedidosService.update$(pedido).subscribe(resp => {
      if (resp.success) {
        this.alertService.mostrar(
          ()=>{ window.location.href = 'pedidos/list/pendientes'}
        );
      }
    });

  }

  ngOnInit() { }

}
