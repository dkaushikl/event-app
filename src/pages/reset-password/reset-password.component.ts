import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login.component';
import { AuthenticationService, UtilProvider } from '../../core/service';
import { Validator } from '../../shared/common/common.validator';
import { ApiResponse } from '../../shared/models/response.model';
import { ApiResponseStatus } from '../../shared/enum/response-status.enum';

@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.component.html',
})

export class ResetPasswordPage {
  resetPasswordForm: FormGroup;

  constructor(private navCtrl: NavController, public navParams: NavParams,
    private fb: FormBuilder, private auth: AuthenticationService, private util: UtilProvider) {
    this.resetPasswordForm = this.fb.group({
      'email': ['', Validators.compose([Validators.required, Validator.validateEmail])],
      'code': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(35)])]
    });
  }

  submit(obj: any, isValid: boolean): void {
    if (isValid) {
      this.util.showLoader();
      this.auth.Reset(obj).subscribe((data: ApiResponse) => {
        this.util.disableLoader();
        this.util.showToast(data.Message);
        if (data.ResponseStatus === ApiResponseStatus.Ok) {
          this.navCtrl.push(LoginPage, {}, { animate: true, direction: 'forward' });
        }
      });
    }
  }

  goToLogin() {
    this.navCtrl.push(LoginPage, {}, { animate: true, direction: 'forward' });
  }
}
