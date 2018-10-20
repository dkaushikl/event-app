import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, MenuController } from 'ionic-angular';
import { CompanyService } from '../../core/service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Validator } from '../../shared/common/common.validator';

@Component({
  selector: 'page-company-member',
  templateUrl: 'company-member.component.html',
})
export class CompanyMemberPage {
  companyId: string;
  companyName: string;
  companyMemberForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public companyService: CompanyService,
    public menuCtrl: MenuController,
    public navParams: NavParams
  ) {
    this.companyMemberForm = this.fb.group({
      'email': ['', [Validators.required, Validator.validateEmail]],
    });
    const params = this.navParams.get('company');
    this.companyId = params.id;
    this.companyName = params.name;
  }

  addCompanyMember(obj: any, isValid: boolean) {
    if (isValid) {
      this.viewCtrl.dismiss({
        companyId: this.companyId,
        email: obj.email,
      });
    }
  }

  cancel() {
    this.navCtrl.pop();
  }
}
