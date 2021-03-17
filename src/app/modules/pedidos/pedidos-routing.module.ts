import { ShowPendientesComponent } from './components/show-pendientes/show-pendientes.component';
import { ListEntregadosComponent } from './components/list-entregados/list-entregados.component';
import { ListPendientesComponent } from './components/list-pendientes/list-pendientes.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'list',
    component: TabsComponent,
    children: [
      {
        path: 'pendientes',
        component: ListPendientesComponent
      },
      {
        path: 'entregados',
        component: ListEntregadosComponent
      },
    ]
  },
  {
    path: 'show/:id',
    component: ShowPendientesComponent
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
