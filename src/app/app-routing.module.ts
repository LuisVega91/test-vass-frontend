import { ProductosModule } from './modules/productos/productos.module';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'productos',
    loadChildren: () => import('./modules/productos/productos.module').then( m => m.ProductosModule)
  },
  {
    path: 'proveedores',
    loadChildren: () => import('./modules/proveedores/proveedores.module').then( m => m.ProveedorModule)
  },
  {
    path: 'inventarios',
    loadChildren: () => import('./modules/inventarios/inventarios.module').then( m => m.InventariosModule)
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./modules/pedidos/pedidos.module').then( m => m.PedidosModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
