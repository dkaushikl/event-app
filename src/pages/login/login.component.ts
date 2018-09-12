import { Component } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { AngularFireAuth } from "angularfire2/auth";
import { NavController, NavParams, MenuController } from "ionic-angular";
import { RegisterPage } from "../register/register.component";
import { EventListPage } from "../event-list/event-list.component";

@Component({
  selector: "page-login",
  templateUrl: "login.component.html"
})

export class LoginPage {
  user = {} as User;
  isLoginSubmitted = false;
  public loginForm: FormGroup;
  constructor(public menuCtrl: MenuController, public fb: FormBuilder, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
    this.menuCtrl.enable(false, 'myMenu');
    this.BindData();
  }

  BindData() {
    this.loginForm = this.fb.group({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required])
    });
  }

  async login(user: User, isValid: boolean) {
    this.isLoginSubmitted = true;
    if (isValid) {
      try {
        const result = await this.afAuth.auth.signInWithEmailAndPassword(
          user.email,
          user.password
        );
        this.isLoginSubmitted = false;
        this.navCtrl.setRoot(EventListPage, {}, { animate: true, direction: 'forward' });
        console.log(result);
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  register() {
    this.navCtrl.setRoot(RegisterPage, {}, { animate: true, direction: 'forward' });
  }

  // async loginGoogle(): void {
  //   this.loading.show();
  //  const result =  this.afAuth.auth.signinwi().then(res => {
  //   }).catch(err => {
  //     if (err)
  //       this.toast.showWithDuration(this.translate.get('LOGIN_GOOGLE_ERROR'), ToastConfig.duration);
  //     this.loading.hide();
  //   });
  // }
}

export interface User {
  email: string;
  password: string;
}
