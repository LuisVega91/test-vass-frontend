import { FormComponent } from './../kardex/components/form/form.component';
import { ListComponent } from './../kardex/components/list/list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'list',
    component: ListComponent
  },
  {
    path: 'list/:id_producto',
    component: ListComponent
  },
  {
    path: 'form/:tipo',
    component: FormComponent
  },
  {
    path: 'form/:tipo/:id',
    component: FormComponent
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
export class KardexRoutingModule { }
