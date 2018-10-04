import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, MenuController, NavController, NavParams } from 'ionic-angular';
import { ForgotPasswordPage } from '../forgot-password/forgot-password.component';
import { RegisterPage } from '../register/register.component';
import { UtilProvider, AuthenticationService, LocalStorageService } from '../../core/service';
import { Login } from '../../shared/models/authentication.model';
import { ApiResponse } from '../../shared/models/response.model';
import { ApiResponseStatus } from '../../shared/enum/response-status.enum';
import { CompanyListPage } from '../company-list/company-list.component';
@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html',
})

export class LoginPage {
  isLoginSubmitted = false;
  public loginForm: FormGroup;
  constructor(public util: UtilProvider, public menuCtrl: MenuController, public fb: FormBuilder,
     private auth: AuthenticationService,    public navCtrl: NavController, public navParams: NavParams,
      public loadingCtrl: LoadingController, private storage: LocalStorageService) {
    this.menuCtrl.enable(false, 'myMenu');
    this.bindData();
  }

  bindData() {
    this.loginForm = this.fb.group({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  submit(objLogin: Login, isValid: boolean) {
    this.isLoginSubmitted = true;
    if (isValid) {
      const loading = this.loadingCtrl.create({
        content: 'Please Wait',
        spinner: 'crescent'
      });

      loading.present();

      this.auth.Login(objLogin).subscribe((data: ApiResponse) => {
        this.util.showToast(data.Message);
        if (data.ResponseStatus === ApiResponseStatus.Ok) {
          this.auth.AddUserStorage(data.Data);
          this.isLoginSubmitted = false;
          loading.dismiss();
          this.navCtrl.setRoot(CompanyListPage, {}, { animate: true, direction: 'forward' });
        } else {
          loading.dismiss();
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
