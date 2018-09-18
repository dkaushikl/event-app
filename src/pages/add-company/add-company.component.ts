import { Component } from '@angular/core';
import { MenuController, NavController, NavParams, ViewController } from 'ionic-angular';
import { CompanyService } from '../../core/company.service';
import { Company } from '../../model';

@Component({
  selector: 'page-add-company',
  templateUrl: 'add-company.component.html',
})
export class AddCompanyPage {
  companyId: string;
  companyName: string;
  editMode: boolean;
  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public companyService: CompanyService,
    public menuCtrl: MenuController, public navParams: NavParams
  ) {
    const params = this.navParams.get('company');
    if (params) {
      this.companyId = params.key;
      this.companyName = params.name;
      this.editMode = true;
    } else {
      this.editMode = false;
    }
  }

  addNewCompany() {
    this.viewCtrl.dismiss({
      name: this.companyName,
    });
  }

  editCompany() {
    this.viewCtrl.dismiss({
      key: this.companyId,
      name: this.companyName,
    });
  }

  cancel() {
    this.navCtrl.pop();
  }
}
