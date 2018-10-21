import { Component } from '@angular/core';
import { PrivacyPage } from '../privacy/privacy.component';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.component.html',
})
export class AboutPage {

  constructor(private navCtrl: NavController) {
  }

  openPrivacyPolicy() {
    this.navCtrl.push(PrivacyPage);
  }
}
