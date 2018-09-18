import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../core/auth.service';
import { LoginPage } from '../login/login.component';
import { WelcomePage } from '../welcome/welcome.component';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.component.html',
})
export class ProfilePage {
  email: string;
  userId: string;

  constructor(public auth: AuthService, public navCtrl: NavController, public navParams: NavParams) {
    this.email = this.auth.getEmail();
    this.userId = this.auth.getUserId();
  }

  logOut() {
    this.auth.signOut();
    this.navCtrl.setRoot(WelcomePage);
  }
}
