import { Component } from '@angular/core';
import { MenuController, NavController, NavParams, ViewController } from 'ionic-angular';
import { CompanyService, UtilProvider } from '../../core/service';
import { Company } from './../../shared/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Validator } from '../../shared/common/common.validator';
import { ApiResponse } from '../../shared/models/response.model';
import { ApiResponseStatus } from '../../shared/enum/response-status.enum';

@Component({
  selector: 'page-add-company',
  templateUrl: 'add-company.component.html'
})
export class AddCompanyPage {
  company: Company;
  editMode: boolean;
  companyForm: FormGroup;
  id: string;
  isUpdating = false;
  constructor(private fb: FormBuilder, public viewCtrl: ViewController, public navCtrl: NavController,
    public companyService: CompanyService, public menuCtrl: MenuController, public navParams: NavParams, private util: UtilProvider
  ) {
    this.bindForm();
    const params = this.navParams.get('company');
    if (params) {
      this.company = this.navParams.data.company;
      this.id = this.company.id;
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

  insertUpdateCompany(isValid: boolean) {
    this.isUpdating = true;
    if (isValid) {
      this.util.showLoader();
      if (this.editMode) {
        this.company.id = this.company.id;
        this.companyService.updateCompany(this.company).subscribe((result: ApiResponse) => {
          this.isUpdating = false;
          this.util.disableLoader();
          this.util.showToast(result.Message);
          if (result.ResponseStatus === ApiResponseStatus.Ok) {
            this.viewCtrl.dismiss(this.company);
          }
        });
      } else {
        this.companyService.addCompany(this.company).subscribe((result: ApiResponse) => {
          this.isUpdating = false;
          this.util.disableLoader();
          this.util.showToast(result.Message);
          if (result.ResponseStatus === ApiResponseStatus.Ok) {
            this.viewCtrl.dismiss(this.company);
          }
        });
      }
    }
  }

  cancel() {
    this.navCtrl.pop();
  }
}
