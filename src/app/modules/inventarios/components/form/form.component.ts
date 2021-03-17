import { ProveedoresService } from './../../../proveedores/services/proveedores.service';
import { ProductosService } from './../../../productos/services/productos.service';
import { Proveedor } from './../../../proveedores/models/proveedor';
import { Producto } from './../../../productos/models/producto';
import { catchError } from 'rxjs/operators';
import { AlertService } from './../../../../shared/services/alert.service';
import { InventariosService } from './../../services/inventarios.service';
import { Inventario } from './../../models/inventario';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {


  formulario: FormGroup;
  error: HttpErrorResponse = null;
  cargaCompleta = false;
  inventario: Inventario = null;
  productos: Producto[]= null;
  proveedores: Proveedor[]= null;

  constructor(
    private route: ActivatedRoute,
    private inventariosService: InventariosService,
    private productosService: ProductosService,
    private proveedoresService: ProveedoresService,
    private fb: FormBuilder,
    private alertService: AlertService) {
      this.getDataForm();
  }

  getDataForm() {
    const id = this.route.snapshot.paramMap.get('id');
    forkJoin([
      this.inventariosService.get$(id),
      this.productosService.getAll$(),
      this.proveedoresService.getAll$(),
    ])
      .pipe(catchError(err => this.error = err))
      .subscribe(resp => {
        this.inventario = resp[0];
        this.productos = resp[1];
        this.proveedores = resp[2];
        this.crearFormulario();
      });
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      id: [this.inventario.id, Validators.required],
      producto_id: [Number(this.inventario.producto_id), [Validators.pattern(/^[0-9]*$/), Validators.required, Validators.maxLength(50)]],
      proveedor_id: [Number(this.inventario.proveedor_id), [Validators.pattern(/^[0-9]*$/), Validators.required, Validators.maxLength(50)]],
      cantidad: [this.inventario.cantidad, [Validators.pattern(/^[0-9]*$/), Validators.required, Validators.maxLength(50)]],
    });
    this.cargaCompleta = true;
  }

  save() {
    if (this.formulario.value.id) {

      this.inventariosService.update$(this.formulario.value).subscribe(resp => {
        if (resp.success) {
          this.alertService.mostrar();
          this.formulario.reset(resp.data);
        }
      });
    } else {
      this.inventariosService.create$(this.formulario.value).subscribe(resp => {
        if (resp.success) {
          this.alertService.mostrar();
          console.log(resp.data);
          this.formulario.reset(resp.data);
        }
      });
    }

  }

  ngOnInit() { }

}
