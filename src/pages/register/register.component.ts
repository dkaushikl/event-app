import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, MenuController, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from './../login/login.component';
import { HomePage } from '../home/home.component';
import { UtilProvider, AuthenticationService } from '../../core/service';
import { ApiResponseStatus } from '../../shared/enum/response-status.enum';
import { Validator } from '../../shared/common/common.validator';
import { ApiResponse } from '../../shared/models/response.model';
import { Register } from '../../shared/models/authentication.model';

@Component({
  selector: 'page-register',
  templateUrl: 'register.component.html'
})

export class RegisterPage {
  isUpdating = false;
  public registerForm: FormGroup;

  constructor(public util: UtilProvider, public menuCtrl: MenuController, public fb: FormBuilder, public navParams: NavParams,
    private auth: AuthenticationService, public loadingCtrl: LoadingController, public navCtrl: NavController) {
    this.menuCtrl.enable(false, 'myMenu');
    this.bindData();
  }

  bindData() {
    this.registerForm = this.fb.group({
      'firstname': ['', Validators.compose([Validators.required])],
      'lastname': ['', Validators.compose([Validators.required])],
      'email': ['', Validators.compose([Validators.required, Validator.validateEmail])],
      'mobileno': ['', Validators.compose([Validators.minLength(10), Validators.maxLength(13), Validators.required])],
      'password': ['', Validators.compose([Validators.required])]
    });
  }

  submit(objRegister: Register, isValid: boolean) {
    this.isUpdating = true;
    if (isValid) {
      this.util.showLoader();
      this.auth.register(objRegister).subscribe((data: ApiResponse) => {
        this.util.showToast(data.Message);
        this.isUpdating = false;
        if (data.ResponseStatus === ApiResponseStatus.Ok) {
          this.navCtrl.setRoot(HomePage, {}, { animate: true, direction: 'forward' });
        } else {
          this.util.disableLoader();
        }
      });
    } else {
      this.util.showToast('All field are mandatory!!');
      this.isUpdating = false;
    }
  }

  login() {
    this.navCtrl.push(LoginPage, {}, { animate: true, direction: 'forward' });
  }
}
