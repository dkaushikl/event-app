import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, MenuController } from 'ionic-angular';
import { CompanyService } from '../../core';

@Component({
  selector: 'page-company-member',
  templateUrl: 'company-member.component.html',
})
export class CompanyMemberPage {
  companyId: string;
  companyName: string;
  email: string;
  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public companyService: CompanyService,
    public menuCtrl: MenuController,
    public navParams: NavParams
  ) {
    const params = this.navParams.get('company');
    this.companyId = params.key;
    this.companyName = params.name;
  }

  addCompanyMember() {
    this.viewCtrl.dismiss({
      key: this.companyId,
      email: this.email,
    });
  }

  cancel() {
    this.navCtrl.pop();
  }
}
