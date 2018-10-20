import { Component } from '@angular/core';
import {
  MenuController,
  NavController,
  NavParams,
  ViewController
} from 'ionic-angular';
import { CompanyService } from '../../core/service';
import { Company } from './../../shared/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Validator } from '../../shared/common/common.validator';

@Component({
  selector: "page-add-company",
  templateUrl: 'add-company.component.html'
})
export class AddCompanyPage {
  company: Company;
  editMode: boolean;
  companyForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public companyService: CompanyService,
    public menuCtrl: MenuController,
    public navParams: NavParams
  ) {
    this.bindForm();
    const params = this.navParams.get('company');
    if (params) {
      this.company = this.navParams.data.company;
      this.editMode = true;
    } else {
      this.company = new Company();
      this.editMode = false;
    }
  }

  bindForm() {
    this.companyForm = this.fb.group({
      'name': ['', Validators.compose([Validators.required])],
      'email': ['', Validators.compose([Validators.required, Validator.validateEmail])],
      'mobileno': ['', Validators.compose([Validators.minLength(10), Validators.maxLength(13), Validators.required])],
      'address': ['', Validators.compose([Validators.required])],
      'city': ['', Validators.compose([Validators.required])],
      'state': ['', Validators.compose([Validators.required])],
      'country': ['', Validators.compose([Validators.required])]
    });
  }

  addNewCompany(obj: any, isValid: boolean) {
    if (isValid) {
      if (this.editMode) {
        this.viewCtrl.dismiss({
          id: this.company.id,
          name: obj.name,
          email: obj.email,
          mobileno: obj.mobileno,
          address: obj.address,
          city: obj.city,
          state: obj.state,
          country: obj.country
        });
      } else {
        this.viewCtrl.dismiss({
          name: obj.name,
          email: obj.email,
          mobileno: obj.mobileno,
          address: obj.address,
          city: obj.city,
          state: obj.state,
          country: obj.country
        });
      }
    }
  }

  cancel() {
    this.navCtrl.pop();
  }
}
