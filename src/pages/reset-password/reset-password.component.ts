import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../core/auth.service';
import { SharedProvider } from '../../shared/shared.provider';
import { LoginPage } from '../login/login.component';

@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.component.html',
})
export class ResetPasswordPage {
  resetPasswordForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, private auth: AuthService,
    public loadingCtrl: LoadingController, public shared: SharedProvider) {
    this.resetPasswordForm = this.fb.group({
      'email': new FormControl('', [Validators.required, Validators.email])
    });
  }

  submit(obj: any, isValid: boolean): void {
    // this.isRegisterSubmitted = true;
    if (isValid) {
      const loading = this.loadingCtrl.create({
        content: 'Please Wait',
        spinner: 'crescent'
      });
      loading.present();
      this.auth.resetPassword(obj.email).subscribe(registerData => {
        alert('Password recovery link is sent.');
        loading.dismiss();
        this.navCtrl.setRoot(LoginPage, {}, { animate: true, direction: 'forward' });
      }, registerError => {
        this.shared.Toast.show(registerError.message)
      });
    }
  }

  goToLogin() {
    this.navCtrl.setRoot(LoginPage, {}, { animate: true, direction: 'forward' });
  }
}
