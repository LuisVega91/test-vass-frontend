import { MensajesModule } from './../../shared/module/mensajes/mensajes.module';
import { IonicModule } from '@ionic/angular';
import { ListComponent } from './components/list/list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { FormComponent } from './components/form/form.component';
import { NgForm, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FormComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    IonicModule,
    MensajesModule,
    ReactiveFormsModule,
  ]
})
export class ProductosModule { }
