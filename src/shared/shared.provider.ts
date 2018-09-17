import { Injectable } from '@angular/core';
import { AlertController, Events, ToastController } from 'ionic-angular';

@Injectable()
export class SharedProvider {

  private _toastMsg;
  constructor(private _toastCtrl: ToastController, private _alert: AlertController, public event: Events) { }

  public Toast = {
    show: (text: string, duration?, position?, closeButton?, btnText?) => {
      this._toastMsg = this._toastCtrl.create({
        message: text,
        duration: duration || closeButton ? null : 3000,
        position: position || 'bottom',
        showCloseButton: closeButton || false,
        closeButtonText: btnText || 'OK'
      });
      this._toastMsg.present();
    },

    hide() {
      this._toastMsg.dismiss();
    }
  };

  public Alert = {
    confirm: (msg?, title?) => {
      return new Promise((resolve, reject) => {
        const alert = this._alert.create({
          title: title || 'Confirm',
          message: msg || 'Do you want continue?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                reject(false);
              }
            },
            {
              text: 'Ok',
              handler: () => {
                resolve(true);
              }
            }
          ]
        });
        alert.present();
      });
    },

    alert: (msg, title?) => {
      const alert = this._alert.create({
        title: title || 'Alert',
        subTitle: msg,
        buttons: ['Dismiss']
      });
      alert.present();
    }
  };
}
