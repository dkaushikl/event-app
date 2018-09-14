import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../core/auth.service';

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
