import { catchError } from 'rxjs/operators';
import { AlertService } from './../../../../shared/services/alert.service';
import { Proveedor } from './../../models/proveedor';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProveedoresService } from '../../services/proveedores.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {


  proveedor: Proveedor = null;
  formulario: FormGroup;
  error: HttpErrorResponse = null;
  cargaCompleta = false;

  constructor(
    private route: ActivatedRoute,
    private proveedorService: ProveedoresService,
    private fb: FormBuilder,
    private alertService: AlertService) {
    this.obtenerProveedor();
  }

  obtenerProveedor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.proveedorService.get$(id)
        .pipe(catchError(err => this.error = err))
        .subscribe(resp => {
          this.proveedor = resp ?? new Proveedor();
          this.crearFormulario();
        });
    } else {
      this.proveedor = new Proveedor();
      this.crearFormulario();
    }
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      id: [this.proveedor.id, Validators.required],
      nombre: [this.proveedor.nombre, [Validators.pattern(/^[0-9a-zA-Z\.\s]*$/), Validators.required, Validators.maxLength(50)]],
    });
    this.cargaCompleta = true;
  }

  save() {
    if (this.formulario.value.id) {

      this.proveedorService.update$(this.formulario.value).subscribe(resp => {
        if (resp.success) {
          this.alertService.mostrar();
          this.formulario.reset(resp.data);
        }
      });
    } else {
      this.proveedorService.create$(this.formulario.value).subscribe(resp => {
        if (resp.success) {
          this.alertService.mostrar();
          this.formulario.reset(resp.data);
        }
      });
    }

  }

  ngOnInit() { }

}
