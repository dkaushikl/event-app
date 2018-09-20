import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, MenuController, NavController, NavParams } from 'ionic-angular';
import { User } from '../../shared/models';
import { LoginPage } from './../login/login.component';
import { UtilProvider, AuthService } from '../../core/service';

@Component({
  selector: 'page-register',
  templateUrl: 'register.component.html'
})

export class RegisterPage {
  user = {} as User;
  isRegisterSubmitted = false;
  public registerForm: FormGroup;

  constructor(public util: UtilProvider, public menuCtrl: MenuController, public fb: FormBuilder,
    private auth: AuthService, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams) {
    this.menuCtrl.enable(false, 'myMenu');
    this.BindData();
  }

  BindData() {
    this.registerForm = this.fb.group({
      'firstname': ['', Validators.compose([Validators.required])],
      'lastname': ['', Validators.compose([Validators.required])],
      'email': ['', Validators.compose([Validators.minLength(5), Validators.maxLength(160), Validators.required, Validators.email])],
      'mobileno': ['', Validators.compose([Validators.minLength(10), Validators.maxLength(13), Validators.required])],
      'password': new FormControl('', [Validators.minLength(6), Validators.maxLength(20), Validators.required])
    });
  }

  async register(objUser: User, isValid: boolean) {
    this.isRegisterSubmitted = true;
    if (isValid) {
      const loading = this.loadingCtrl.create({
        content: 'Please Wait',
        spinner: 'crescent'
      });
      loading.present();
      try {
        objUser.createdDate = new Date().toDateString();
        objUser.status = true;
        debugger;
        await this.auth.signUp(objUser);
        this.isRegisterSubmitted = false;
        loading.dismiss();
        this.navCtrl.push(LoginPage, {}, { animate: true, direction: 'forward' });
      } catch (error) {
        loading.dismiss();
        switch (error.code) {
          case 'auth/invalid-email':
            this.util.showToast('Please enter a valid email address.');
            break;
          case 'auth/weak-password':
            this.util.showToast('Enter strong password.');
            break;
          case 'auth/email-already-in-use':
            this.util.showToast('This email has already been used for another account.');
            break;
          default:
            this.util.showToast(error.message);
            break;
        }
      }
    }
  }

  login() {
    this.navCtrl.push(LoginPage, {}, { animate: true, direction: 'forward' });
  }
}
