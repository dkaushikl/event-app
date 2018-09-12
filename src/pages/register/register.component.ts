import { User, LoginPage } from "./../login/login.component";
import { Component } from "@angular/core";
import { NavController, NavParams, MenuController } from "ionic-angular";
import { AngularFireAuth } from "angularfire2/auth";
import { SharedProvider } from "../../shared/shared.provider";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

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
    private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.menuCtrl.enable(false, 'myMenu');
    this.BindData();
  }

  BindData() {
    this.registerForm = this.fb.group({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required])
    });
  }

  async register(user: User, isValid: boolean) {
    this.isRegisterSubmitted = true;

    if (isValid) {
      try {
        await this.afAuth.auth.createUserWithEmailAndPassword(
          user.email,
          user.password
        );
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
