import { KardexService } from './../../services/kardex.service';
import { catchError } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { AlertService } from './../../../../shared/services/alert.service';
import { ProductosService } from './../../../productos/services/productos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Producto } from './../../../productos/models/producto';
import { Component, OnInit } from '@angular/core';

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
  id: string;
  tipo: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productosService: ProductosService,
    private kardexService: KardexService,
    private fb: FormBuilder,
    private alertService: AlertService) {
  }

  ionViewWillEnter() {
    this.tipo = this.route.snapshot.paramMap.get('tipo');
    this.id = this.route.snapshot.paramMap.get('id');
    this.getDataForm();

  }

  getDataForm() {
    this.productosService.get$(this.id)
      .pipe(catchError(err => this.error = err))
      .subscribe(resp => {
        this.producto = resp;
        this.crearFormulario();
      });
  }

  suma(n, m){
    const r = Number (n) + Number (m);
    return isNaN(r)? 0 : r;
  }

  crearFormulario() {
    this.formulario = this.fb.group({

      id_producto: [
        this.id,
        Validators.required
      ],

      cantidad: [
        0,
        [
          Validators.pattern(/^[0-9]*$/),
          Validators.required, Validators.maxLength(50), Validators.min(1),
          this.tipo == 'venta' ? Validators.max(this.producto?.detalle?.saldo_cantidad || 0): Validators.required
        ]
      ],

      valor_unitario: [
        this.producto?.detalle?.valor_unitario || 0,
        [
          Validators.pattern(/^[0-9\.]*$/),
          Validators.required, Validators.maxLength(50)
        ]
      ],

      descripcion: [
        'Venta de ' + this.producto.articulo,
        [
          Validators.pattern(/^[0-9a-zA-Z\.\s\-]*$/),
          Validators.required,
          Validators.maxLength(50)
        ]
      ],

    });
    this.cargaCompleta = true;
  }

  save() {
    let peticion$: Observable<any>;
    if(this.tipo == 'venta'){
      peticion$ = this.kardexService.venta$(this.formulario.value)
    }else{
      peticion$ = this.kardexService.compra$(this.formulario.value)
    }

    peticion$.subscribe(resp => {
      if (resp.success) {
        this.formulario.reset(resp.data);
        this.alertService.mostrar(()=>{this.router.navigateByUrl('/kardex/list/' + this.id)});
      }
    });
  }

  ngOnInit() { }

}

