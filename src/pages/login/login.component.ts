import { Component } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { NavController, NavParams, MenuController } from "ionic-angular";
import { RegisterPage } from "../register/register.component";
import { EventListPage } from "../event-list/event-list.component";
import { SharedProvider } from "../../shared/shared.provider";
import { AuthService } from "../../core/auth.service";
import { User } from "../../model/user";

@Component({
  selector: "page-login",
  templateUrl: "login.component.html",
  providers: [SharedProvider]
})

export class LoginPage {
  user = {} as User;
  isLoginSubmitted = false;
  public loginForm: FormGroup;
  constructor(public shared: SharedProvider, public menuCtrl: MenuController, public fb: FormBuilder, private auth: AuthService, public navCtrl: NavController, public navParams: NavParams) {
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
      try {
        await this.auth.signInWithEmail(objUser).then(newUser => {
          this.isLoginSubmitted = false;
          this.navCtrl.setRoot(EventListPage, {}, { animate: true, direction: 'forward' });
        });
      } catch (error) {
        this.shared.Toast.show(error.message);
      }
    }
  }

  register() {
    this.navCtrl.setRoot(RegisterPage);
  }
}
