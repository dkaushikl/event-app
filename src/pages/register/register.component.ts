import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, MenuController, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from './../login/login.component';
import { UtilProvider, AuthenticationService } from '../../core/service';
import { Register } from '../../shared/models/authentication.model';
import { ApiResponse } from '../../shared/models/response.model';
import { ApiResponseStatus } from '../../shared/enum/response-status.enum';
import { EventListPage } from '../event-list/event-list.component';

@Component({
  selector: 'page-register',
  templateUrl: 'register.component.html'
})

export class RegisterPage {
  isRegisterSubmitted = false;
  public registerForm: FormGroup;

  constructor(public util: UtilProvider, public menuCtrl: MenuController, public fb: FormBuilder,
    private auth: AuthenticationService, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams) {
    this.menuCtrl.enable(false, 'myMenu');
    this.bindData();
  }

  bindData() {
    this.registerForm = this.fb.group({
      'firstname': ['', Validators.compose([Validators.required])],
      'lastname': ['', Validators.compose([Validators.required])],
      'email': ['', Validators.compose([Validators.minLength(5), Validators.maxLength(160), Validators.required, Validators.email])],
      'mobileno': ['', Validators.compose([Validators.minLength(10), Validators.maxLength(13), Validators.required])],
      'password': new FormControl('', [Validators.minLength(3), Validators.maxLength(20), Validators.required])
    });
  }

  submit(objRegister: Register, isValid: boolean) {
    this.isRegisterSubmitted = true;
    if (isValid) {
      const loading = this.loadingCtrl.create({
        content: 'Please Wait',
        spinner: 'crescent'
      });

      loading.present();

      this.auth.Register(objRegister).subscribe((data: ApiResponse) => {
        this.util.showToast(data.Message);
        if (data.ResponseStatus === ApiResponseStatus.Ok) {
          this.isRegisterSubmitted = false;
          loading.dismiss();
          this.navCtrl.setRoot(EventListPage, {}, { animate: true, direction: 'forward' });
        } else {
          loading.dismiss();
        }
      });
    }
  }

  login() {
    this.navCtrl.push(LoginPage, {}, { animate: true, direction: 'forward' });
  }
}
