import { AlertService } from './../../../../shared/services/alert.service';
import { ProveedoresService } from './../../services/proveedores.service';
import { Proveedor } from './../../models/proveedor';
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

  @ViewChild('listadoProveedores') listadoProveedores: IonList;

  proveedores$: Observable<Proveedor[]>;
  error = null;

  constructor(
    private proveedoresService: ProveedoresService,
    private router: Router,
    private alertService: AlertService,
  ) {

  }

  delete(id: string | number) {
    this.listadoProveedores.closeSlidingItems();
    this.alertService.mostrar(
      () => { this.proveedoresService.delete$(id).subscribe(r => this.ionViewWillEnter()) },
      () => { },
    );
  }

  form(id?: string | number) {
    this.listadoProveedores.closeSlidingItems();
    id = id ? '/' + id : '';
    this.router.navigateByUrl('proveedores/form' + id);
  }

  ionViewWillEnter(event?: any) {
    this.error = null;
    this.proveedores$ = this.proveedoresService.getAll$()
    .pipe(catchError(err => this.error = err));
    if (event) { event.target.complete(); }
  }

  ngOnInit() { }

}
