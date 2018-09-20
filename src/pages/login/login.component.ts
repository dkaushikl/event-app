import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, MenuController, NavController, NavParams } from 'ionic-angular';
import { User } from '../../shared/models';
import { EventListPage } from '../event-list/event-list.component';
import { ForgotPasswordPage } from '../forgot-password/forgot-password.component';
import { RegisterPage } from '../register/register.component';
import { AuthService, UtilProvider } from '../../core/service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html',
})

export class LoginPage {
  user = {} as User;
  isLoginSubmitted = false;
  public loginForm: FormGroup;
  constructor(public util: UtilProvider, public menuCtrl: MenuController, public fb: FormBuilder, private auth: AuthService,
    public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.menuCtrl.enable(false, 'myMenu');
    this.BindData();
  }

  BindData() {
    this.loginForm = this.fb.group({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  async login(objUser: User, isValid: boolean) {
    this.isLoginSubmitted = true;
    if (isValid) {
      const loading = this.loadingCtrl.create({
        content: 'Please Wait',
        spinner: 'crescent'
      });
      loading.present();
      try {
        await this.auth.signInWithEmail(objUser).then(() => {
          this.isLoginSubmitted = false;
          loading.dismiss();
          this.navCtrl.setRoot(EventListPage, {}, { animate: true, direction: 'forward' });
        });
      } catch (error) {
        loading.dismiss();
        switch (error.code) {
          case 'auth/invalid-email':
            this.util.showToast('Please enter a valid email address');
            break;
          case 'auth/wrong-password':
            this.util.showToast('Incorrect username and password combination.');
            break;
          case 'auth/user-not-found':
            this.util.showToast('User not found.');
            break;
          default: {
            this.util.showToast(error.message);
            break;
          }
        }
      }
    }
  }

  goToSignup() {
    this.navCtrl.push(RegisterPage, {}, { animate: true, direction: 'forward' });
  }

  goToForgotPassword() {
    this.navCtrl.push(ForgotPasswordPage, {}, { animate: true, direction: 'forward' });
  }
}
