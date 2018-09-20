import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login.component';
import { RegisterPage } from '../register/register.component';
import { AuthService, UtilProvider } from '../../core/service';

@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.component.html',
})
export class ForgotPasswordPage {
  resetPasswordForm: FormGroup;
  constructor(private navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, private auth: AuthService,
    private loadingCtrl: LoadingController, private util: UtilProvider) {
    this.resetPasswordForm = this.fb.group({
      'email': new FormControl('', [Validators.required, Validators.email])
    });
  }

  submit(obj: any, isValid: boolean): void {
    if (isValid) {
      const loading = this.loadingCtrl.create({
        content: 'Please Wait',
        spinner: 'crescent'
      });
      loading.present();
      this.auth.resetPassword(obj.email).subscribe(() => {
        loading.dismiss();
        this.navCtrl.push(LoginPage, {}, { animate: true, direction: 'forward' });
      }, registerError => {
        this.util.showToast(registerError.message);
      });
    }
  }

  goToLogin() {
    this.navCtrl.push(LoginPage, {}, { animate: true, direction: 'forward' });
  }

  goToSignup() {
    this.navCtrl.push(RegisterPage, {}, { animate: true, direction: 'forward' });
  }
}
