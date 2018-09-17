import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, MenuController, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../core/auth.service';
import { User } from '../../model/user';
import { SharedProvider } from '../../shared/shared.provider';
import { EventListPage } from '../event-list/event-list.component';
import { ForgotPasswordPage } from '../forgot-password/forgot-password.component';
import { RegisterPage } from '../register/register.component';

@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html',
  providers: [SharedProvider]
})

export class LoginPage {
  user = {} as User;
  isLoginSubmitted = false;
  public loginForm: FormGroup;
  constructor(public shared: SharedProvider, public menuCtrl: MenuController, public fb: FormBuilder, private auth: AuthService,
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
            this.shared.Toast.show('Please enter a valid email address');
            break;
          case 'auth/wrong-password':
            this.shared.Toast.show('Incorrect username and password combination.');
            break;
          case 'auth/user-not-found':
            this.shared.Toast.show('User not found.');
            break;
          default: {
            this.shared.Toast.show(error.message);
            break;
          }
        }
      }
    }
  }

  goToSignup() {
    this.navCtrl.push(RegisterPage, {}, { animate: true, direction: 'forward' });
  }

  loginWithGoogle() {
    // this.auth.signInWithGoogle()
    //   .then((result: any) => {
    //     this.newMethod(result);
    //   }).catch((error): any => {
    //     this.shared.Toast.show(error.message);
    //   });
  }

  loginWithFacebook() {
    this.auth.signInWithFacebook().then((result: any) => {
    }).catch((error): any => {
      this.shared.Toast.show(error.message);
    });
  }

  goToForgotPassword() {
    this.navCtrl.push(ForgotPasswordPage, {}, { animate: true, direction: 'forward' });
  }
}
