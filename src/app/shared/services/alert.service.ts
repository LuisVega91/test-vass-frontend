import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController) { }

  async mostrar(
    aceptHandler?: (data?: any) => void,
    cancelHandler?: () => void,
    titulo: string = !cancelHandler ? 'Exito' : 'Seguro que desea Realizar esta accion?',
    mensaje: string = !cancelHandler ? 'Operacion realizada con exito' : '',
    aceptText: string = 'Aceptar',
    cancelText: string = 'Cancelar',
    backdropDismiss: boolean = false,
    subtitulo?: string,
    inputs = [],
  ) {

    let buttons: any[] = [aceptText];
    if (aceptHandler) {
      buttons = [{ text: aceptText, handler: aceptHandler, }];
    }
    if (cancelHandler) {
      buttons.push({text: cancelText , handler: cancelHandler });
    }
    const alert = await this.alertController.create({
      mode: "ios",
      header: titulo,
      subHeader: subtitulo,
      message: mensaje,
      buttons,
      backdropDismiss,
      inputs,
    });

    await alert.present();
  }
}
