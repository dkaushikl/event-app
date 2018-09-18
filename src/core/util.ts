import { Injectable } from '@angular/core';
import { AlertController, Platform, ToastController } from 'ionic-angular';

@Injectable()
export class UtilProvider {

  constructor(private alertCtrl: AlertController, private platformSrv: Platform, private toastCtrl: ToastController) {
    console.log('Hello UtilProvider Provider');
  }

  /**
   *
   */
  public isNativePlatform() {
    return (this.platformSrv.is('cordova') && this.platformSrv.is('mobile'));
  }

  /**
   * Displays toast message into the screen
   * @param {string} message Message to display
   */
  public showToast(message: string, duration?: number, position?: string): void {
    const toast = this.toastCtrl.create({
      message: message,
      duration: duration || 3000,
      position: position || 'bottom'
    });
    toast.present();
  }

  /**
   * Prompts an alert into the screen
   * @param {string} title Title of the alert
   * @param {string} msg Message of the alert
   * @param {Array<Object>} buttons (optional) Array of buttons. By default 'OK'
   */
  public showAlert(title: string, msg: string, buttons?: Array<Object>): void {
    this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: buttons || ['OK']
    }).present();
  }

  /**
   *
   * @param title
   * @param message
   * @param inputs
   * @param buttons
   */
  public showPromptAlert(title: string, message: string, inputs?: Array<Object>, buttons?: Array<Object>) {
    this.alertCtrl.create({
      title: title,
      message: message,
      inputs: inputs || [],
      buttons: buttons || ['OK']
    }).present();
  }

}
