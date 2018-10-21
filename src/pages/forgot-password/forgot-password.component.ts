import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login.component';
import { AuthenticationService, UtilProvider } from '../../core/service';
import { ResetPasswordPage } from '../reset-password/reset-password.component';
import { Validator } from '../../shared/common/common.validator';
import { ApiResponse } from '../../shared/models/response.model';
import { ApiResponseStatus } from '../../shared/enum/response-status.enum';

@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.component.html',
})
export class ForgotPasswordPage {
  forgotPasswordForm: FormGroup;
  constructor(private navCtrl: NavController, public navParams: NavParams,
    private fb: FormBuilder, private auth: AuthenticationService, private util: UtilProvider) {
    this.forgotPasswordForm = this.fb.group({
      'email': ['', Validators.compose([Validators.required, Validator.validateEmail])],
    });
  }

  submit(obj: any, isValid: boolean): void {
    if (isValid) {
      this.util.showLoader();
      this.auth.Forgot(obj).subscribe((data: ApiResponse) => {
        this.util.showToast(data.Message);
        this.util.disableLoader();
        if (data.ResponseStatus === ApiResponseStatus.Ok) {
          this.navCtrl.push(ResetPasswordPage);
        }
      });
    }
  }

  goToLogin() {
    this.navCtrl.push(LoginPage, {}, { animate: true, direction: 'forward' });
  }
}
