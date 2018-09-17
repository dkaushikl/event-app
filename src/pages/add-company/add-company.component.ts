import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { MenuController, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthService } from '../../core/auth.service';
import { CompanyService } from '../../core/company.service';
import { Company } from '../../model/events';

@Component({
  selector: 'page-add-company',
  templateUrl: 'add-company.component.html',
})
export class AddCompanyPage {
  company: Company;
  isEventFormSubmitted = false;
  companyList: AngularFireList<any>;
  companyForm: FormGroup;
  isAddOrEdit: string;
  constructor(
    private auth: AuthService,
    private toastCtrl: ToastController,
    public fb: FormBuilder,
    public navCtrl: NavController,
    db: AngularFireDatabase,
    public companyService: CompanyService,
    public menuCtrl: MenuController, public params: NavParams
  ) {
    this.company = new Company();
    this.company = this.params.data;
    this.isAddOrEdit = this.company && this.company.name ? 'Update' : 'Add';
    this.menuCtrl.enable(false, 'myMenu');
    this.companyList = db.list('company');
    this.bindData();
  }

  bindData() {
    this.companyForm = this.fb.group({
      name: new FormControl('', [Validators.required])
    });
  }

  Submit(obj: Company, isValid: boolean) {
    this.isEventFormSubmitted = true;
    if (isValid) {
      obj.createdDate = new Date().toDateString();
      obj.createdBy = this.auth.getUserId();
      if (this.company.key) {
        this.companyService.updateCompany(this.company.key, obj);
        const toast = this.toastCtrl.create({
          message: 'Update company',
          duration: 2000,
          position: 'top'
        });
        toast.present();
      } else {
        this.companyService.addCompany(obj);
        const toast = this.toastCtrl.create({
          message: 'Successfully add company',
          duration: 2000,
          position: 'top'
        });
        toast.present();
      }
      this.isEventFormSubmitted = false;
      this.navCtrl.pop();
    }
  }

  goBack() {
    this.navCtrl.pop();
  }

  ionViewCanLeave() {
    this.menuCtrl.enable(true, 'myMenu');
  }
}
