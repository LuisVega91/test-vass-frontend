import { ListEntregadosComponent } from './components/list-entregados/list-entregados.component';
import { ShowPendientesComponent } from './components/show-pendientes/show-pendientes.component';
import { MensajesModule } from './../../shared/module/mensajes/mensajes.module';
import { ListPendientesComponent } from './components/list-pendientes/list-pendientes.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { PedidosRoutingModule } from './pedidos-routing.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    TabsComponent,
    ListPendientesComponent,
    ListEntregadosComponent,
    ShowPendientesComponent,
  ],
  imports: [
    CommonModule,
    PedidosRoutingModule,
    IonicModule,
    MensajesModule,
  ]
})
export class PedidosModule { }
