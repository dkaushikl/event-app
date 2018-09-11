import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { RegisterPage } from "../register/register.component";
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  selector: "page-login",
  templateUrl: "login.component.html"
})

export class LoginPage {
  user = {} as User;
  constructor(private afauth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {}

  login() {
    // try {
    //   const result = await this.afAuth.auth.sig
    //   console.log(result);
    // } catch (error) {
    //   console.log(error);
    // }
  }

  register() {
    this.navCtrl.push(RegisterPage)
  }
}

export interface User {
  email: string;
  password: string;
}
