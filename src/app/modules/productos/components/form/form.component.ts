import { catchError } from 'rxjs/operators';
import { AlertService } from './../../../../shared/services/alert.service';
import { ProductosService } from './../../services/productos.service';
import { Producto } from './../../models/producto';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {


  producto: Producto = null;
  formulario: FormGroup;
  error: HttpErrorResponse = null;
  cargaCompleta = false;

  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService,
    private fb: FormBuilder,
    private alertService: AlertService) {
    this.obtenerProducto();
  }

  obtenerProducto() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productosService.get$(id)
        .pipe(catchError(err => this.error = err))
        .subscribe(resp => {
          this.producto = resp ?? new Producto();
          this.crearFormulario();
        });
    } else {
      this.producto = new Producto();
      this.crearFormulario();
    }
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      id: [this.producto.id, Validators.required],
      nombre: [this.producto.nombre, [Validators.pattern(/^[0-9a-zA-Z\.\s]*$/), Validators.required, Validators.maxLength(50)]],
      valor: [this.producto.valor, [Validators.pattern(/^[0-9]*$/), Validators.required, Validators.maxLength(50)]],
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
