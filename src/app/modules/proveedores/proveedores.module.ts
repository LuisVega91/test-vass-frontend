import { MensajesModule } from './../../shared/module/mensajes/mensajes.module';
import { IonicModule } from '@ionic/angular';
import { ListComponent } from './components/list/list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProveedorRoutingModule } from './proveedores-routing.module';
import { FormComponent } from './components/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FormComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    ProveedorRoutingModule,
    IonicModule,
    MensajesModule,
    ReactiveFormsModule,
  ]
})
export class ProveedorModule { }
