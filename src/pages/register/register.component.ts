import { LoginPage } from "./../login/login.component";
import { Component } from "@angular/core";
import { NavController, NavParams, MenuController } from "ionic-angular";
import { SharedProvider } from "../../shared/shared.provider";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../core/auth.service";
import { User } from "../../model/user";

@Component({
  selector: "page-register",
  templateUrl: "register.component.html"
})

export class RegisterPage {
  user = {} as User;
  isRegisterSubmitted = false;
  public registerForm: FormGroup;

  constructor(
    public shared: SharedProvider, public menuCtrl: MenuController, public fb: FormBuilder,
    private auth: AuthService,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.menuCtrl.enable(false, 'myMenu');
    this.BindData();
  }

  BindData() {
    this.registerForm = this.fb.group({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  async register(objUser: User, isValid: boolean) {
    this.isRegisterSubmitted = true;
    if (isValid) {
      try {
        await this.auth.signInWithEmail(objUser);
        this.isRegisterSubmitted = false;
        this.navCtrl.setRoot(LoginPage, {}, { animate: true, direction: 'forward' });
      } catch (error) {
        this.shared.Toast.show(error.message);
      }
    }
  }

  login() {
    this.navCtrl.setRoot(LoginPage);
  }
}
