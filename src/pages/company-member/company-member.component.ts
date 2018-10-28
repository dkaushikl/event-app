import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CompanyMemberService, UtilProvider } from '../../core/service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Validator } from '../../shared/common/common.validator';
import { ApiResponse } from '../../shared/models/response.model';

@Component({
  selector: 'page-company-member',
  templateUrl: 'company-member.component.html',
})

export class CompanyMemberPage {
  companyId: string;
  companyName: string;
  companyMemberForm: FormGroup;
  isUpdating = false;

  constructor(private fb: FormBuilder, private viewCtrl: ViewController, private navCtrl: NavController,
    private navParams: NavParams, private companyMemberService: CompanyMemberService, private util: UtilProvider) {
    this.companyMemberForm = this.fb.group({
      'email': ['', [Validators.required, Validator.validateEmail]],
    });
    const params = this.navParams.get('company');
    this.companyId = params.id;
    this.companyName = params.name;
  }

  addCompanyMember(obj: any, isValid: boolean) {
    if (isValid) {
      const data = {
        companyId: this.companyId,
        email: obj.email,
      };
      this.util.showLoader();
      this.companyMemberService.addCompanyMember(data).subscribe((result: ApiResponse) => {
        this.util.disableLoader();
        this.util.showToast(result.Message);
        this.viewCtrl.dismiss(data);
      });
    }
  }

  cancel() {
    this.navCtrl.pop();
  }
}
