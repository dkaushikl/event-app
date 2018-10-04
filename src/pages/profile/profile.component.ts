import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome.component';
import { AuthenticationService } from '../../core/service';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.component.html',
})
export class ProfilePage {
  email: string;
  fullName: string;

  constructor(public auth: AuthenticationService, public navCtrl: NavController, public navParams: NavParams) {
    // this.getFullName();
    // this.getEmail();
  }

  // getFullName() {
  //   this.auth.getFullname().then((fullname) => {
  //     this.fullName = fullname;
  //   });
  // }

  // getEmail() {
  //   this.auth.getEmail().then((email) => {
  //     this.email = email;
  //   });
  // }

  logOut() {
    this.auth.Logout();
    this.navCtrl.setRoot(WelcomePage, {}, { animate: true, direction: 'forward' });
  }
}
