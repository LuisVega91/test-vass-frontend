import { AlertService } from './../../../../shared/services/alert.service';
import { InventariosService } from './../../services/inventarios.service';
import { Inventario } from './../../models/inventario';
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

  @ViewChild('listadoInventarios') listadoInventarios: IonList;
  @ViewChild('termino') terminoBusqueda: IonSearchbar;

  inventarios$: Observable<Inventario[]>;
  error = null;

  constructor(
    private inventariosService: InventariosService,
    private router: Router,
    private alertService: AlertService,
  ) {

  }

  delete(id: string | number) {
    this.listadoInventarios.closeSlidingItems();
    this.alertService.mostrar(
      () => { this.inventariosService.delete$(id).subscribe(r => this.ionViewWillEnter()) },
      () => { },
    );
  }

  form(id?: string | number) {
    this.listadoInventarios.closeSlidingItems();
    id = id ? '/' + id : '';
    this.router.navigateByUrl('inventarios/form' + id);
  }

  ionViewWillEnter(event?: any) {
    this.error = null;
    this.inventarios$ = this.inventariosService.getAll$()
    .pipe(catchError(err => this.error = err));
    if (event) { event.target.complete(); }
  }

  ngOnInit() { }

}
