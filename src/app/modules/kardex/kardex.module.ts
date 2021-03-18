import { FormsModule } from '@angular/forms';
import { MensajesModule } from './../../shared/module/mensajes/mensajes.module';
import { FormComponent } from './../kardex/components/form/form.component';
import { ListComponent } from './../kardex/components/list/list.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KardexRoutingModule } from './kardex-routing.module';
import { MinusSignToParensPipe } from 'src/app/shared/pipes/minus-sign-to-parens.pipe';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent,
    FormComponent,
    MinusSignToParensPipe
  ],
  imports: [
    CommonModule,
    KardexRoutingModule,
    IonicModule,
    MensajesModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class KardexModule { }
