import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login.component';
import { RegisterPage } from '../register/register.component';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.component.html',
})

export class WelcomePage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  login() {
    this.navCtrl.push(LoginPage);
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }
}
