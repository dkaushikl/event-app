import { User } from "./../login/login.component";
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  selector: "page-register",
  templateUrl: "register.component.html"
})
export class RegisterPage {
  user = {} as User;
  constructor(
    private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  async register(user: User) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}
