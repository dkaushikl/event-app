import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, MenuController, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register.component';
import { UtilProvider, AuthenticationService } from '../../core/service';
import { Login } from '../../shared/models/authentication.model';
import { ApiResponseStatus } from '../../shared/enum/response-status.enum';
import { HomePage } from '../home/home.component';
import { ForgotPasswordPage } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html',
})

export class LoginPage {
  isLoginSubmitted = false;
  public loginForm: FormGroup;
  constructor(public util: UtilProvider, public menuCtrl: MenuController, public fb: FormBuilder,
    private auth: AuthenticationService, public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController) {
    this.menuCtrl.enable(false, 'myMenu');
    this.bindData();
  }

  bindData() {
    this.loginForm = this.fb.group({
      'email': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required])
    });
  }

  submit(objLogin: Login, isValid: boolean) {
    this.isLoginSubmitted = true;
    if (isValid) {
      this.util.showLoader();
      this.auth.Login(objLogin).subscribe((data: any) => {
        this.util.showToast(data.Message);
        this.util.disableLoader();
        if (data.ResponseStatus === ApiResponseStatus.Ok) {
          this.isLoginSubmitted = false;
          this.navCtrl.setRoot(HomePage, {}, { animate: true, direction: 'forward' });
        }
      });
    }
  }

  goToSignup() {
    this.navCtrl.push(RegisterPage, {}, { animate: true, direction: 'forward' });
  }

  goToForgotPassword() {
    this.navCtrl.push(ForgotPasswordPage, {}, { animate: true, direction: 'forward' });
  }
}
