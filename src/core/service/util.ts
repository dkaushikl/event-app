import { Injectable } from '@angular/core';
import { AlertController, Platform, ToastController, LoadingController, Loading } from 'ionic-angular';

@Injectable()
export class UtilProvider {
  private loading: Loading;

  constructor(private alertCtrl: AlertController, private platformSrv: Platform, private toastCtrl: ToastController,
    private loadingCtrl: LoadingController) {
  }

  public showLoader() {
    if (!this.loading) {
      this.loading = this.loadingCtrl.create({
        spinner: 'dots',
        content: 'Please wait'
      });

      this.loading.present();
    }
  }

  public disableLoader() {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
  }

  public isNativePlatform() {
    return (this.platformSrv.is('cordova') && this.platformSrv.is('mobile'));
  }

  public showToast(message: string, duration?: number, position?: string) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: duration || 2000,
      position: position || 'bottom',
    });
    toast.present();
  }

  public showAlert(title: string, msg: string, buttons?: Array<Object>) {
    this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: buttons || ['OK']
    }).present();
  }

  public showPromptAlert(title: string, message: string, inputs?: Array<Object>, buttons?: Array<Object>) {
    this.alertCtrl.create({
      title: title,
      message: message,
      inputs: inputs || [],
      buttons: buttons || ['OK']
    }).present();
  }
}
