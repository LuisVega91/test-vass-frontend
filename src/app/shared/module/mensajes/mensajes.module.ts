import { IonicModule } from '@ionic/angular';
import { LoadingComponent } from './components/loading/loading.component';
import { ErrorComponent } from './components/error/error.component';
import { EmptyComponent } from './components/empty/empty.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    EmptyComponent,
    ErrorComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ErrorComponent,
    EmptyComponent,
    LoadingComponent
  ],
})
export class MensajesModule { }
