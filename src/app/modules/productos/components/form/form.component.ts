import { Proveedor } from './../../../proveedores/models/proveedor';
import { ProveedoresService } from './../../../proveedores/services/proveedores.service';
import { catchError } from 'rxjs/operators';
import { AlertService } from './../../../../shared/services/alert.service';
import { ProductosService } from './../../services/productos.service';
import { Producto } from './../../models/producto';
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


  producto: Producto = null;
  proveedores: Proveedor[] = null;
  formulario: FormGroup;
  error: HttpErrorResponse = null;
  cargaCompleta = false;

  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService,
    private proveedoresService: ProveedoresService,
    private fb: FormBuilder,
    private alertService: AlertService) {
    this.getDataForm();
  }


  getDataForm() {
    const id = this.route.snapshot.paramMap.get('id');
    forkJoin([
      this.productosService.get$(id),
      this.proveedoresService.getAll$(),
    ])
      .pipe(catchError(err => this.error = err))
      .subscribe(resp => {
        this.producto = resp[0];
        this.proveedores = resp[1];
        this.crearFormulario();
      });
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      id: [this.producto.id, Validators.required],
      articulo: [this.producto.articulo, [Validators.pattern(/^[0-9a-zA-Z\.\s]*$/), Validators.required, Validators.maxLength(50)]],
      referencia: [this.producto.referencia, [Validators.pattern(/^REF[0-9A-Z]+$/), Validators.required, Validators.maxLength(50)]],
      localizacion: [this.producto.localizacion, [Validators.pattern(/^[0-9a-zA-Z\.\s]*$/), Validators.required, Validators.maxLength(50)]],
      tipo_unidad: [this.producto.tipo_unidad, [Validators.pattern(/^[0-9a-zA-Z\.\s]*$/), Validators.required, Validators.maxLength(50)]],
      minimo: [this.producto.minimo, [Validators.pattern(/^[0-9]*$/), Validators.required, Validators.maxLength(50)]],
      maximo: [this.producto.maximo, [Validators.pattern(/^[0-9]*$/), Validators.required, Validators.maxLength(50)]],
      id_proveedor: [Number(this.producto.id_proveedor), [ Validators.required, Validators.maxLength(50)]],
    });
    this.cargaCompleta = true;
  }

  save() {
    if (this.formulario.value.id) {
      this.productosService.update$(this.formulario.value).subscribe(resp => {
        if (resp.success) {
          this.alertService.mostrar();
          this.formulario.reset(resp.data);
        }
      });
    } else {
      this.productosService.create$(this.formulario.value).subscribe(resp => {
        if (resp.success) {
          this.alertService.mostrar();
          this.formulario.reset(resp.data);
        }
      });
    }
  }

  ngOnInit() { }

}
