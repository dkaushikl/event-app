import { Component } from '@angular/core';
import {
  MenuController,
  NavController,
  NavParams,
  ViewController
} from 'ionic-angular';
import { CompanyService } from '../../core/service';
import { Company } from './../../shared/models';

@Component({
  selector: 'page-add-company',
  templateUrl: 'add-company.component.html'
})
export class AddCompanyPage {
  company: Company;
  editMode: boolean;
  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public companyService: CompanyService,
    public menuCtrl: MenuController,
    public navParams: NavParams
  ) {
    const params = this.navParams.get('company');
    if (params) {
      this.company = this.navParams.data.company;
      this.editMode = true;
    } else {
      this.company = new Company();
      this.editMode = false;
    }
  }

  addNewCompany() {
    this.viewCtrl.dismiss({
      key: 'company-123',
      name: this.company.name,
      email: this.company.email,
      mobileno: this.company.mobileno,
      address: this.company.address,
      city: this.company.city,
      state: this.company.state,
      country: this.company.country
    });
  }

  editCompany() {
    this.viewCtrl.dismiss({
      key: this.company.key,
      name: this.company.name,
      email: this.company.email,
      mobileno: this.company.mobileno,
      address: this.company.address,
      city: this.company.city,
      state: this.company.state,
      country: this.company.country
    });
  }

  cancel() {
    this.navCtrl.pop();
  }
}
