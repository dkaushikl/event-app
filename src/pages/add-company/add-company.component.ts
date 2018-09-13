import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { MenuController, NavController, ToastController, NavParams } from "ionic-angular";
import { Company } from "../../model/events";
import { CompanyService } from "../../core/company.service";

@Component({
  selector: 'page-add-company',
  templateUrl: 'add-company.component.html',
})
export class AddCompanyPage {
  company = { id: '', name: '' };
  isEventFormSubmitted = false;
  companyList: AngularFireList<any>;
  companyForm: FormGroup;
  constructor(
    private toastCtrl: ToastController,
    public fb: FormBuilder,
    public navCtrl: NavController,
    db: AngularFireDatabase,
    public companyService: CompanyService,
    public menuCtrl: MenuController, public params: NavParams
  ) {
    this.company.id = this.params.get('key');
    this.company.name = this.params.get('name');

    this.menuCtrl.enable(false, 'myMenu');
    this.companyList = db.list("company");
    this.bindData();
  }

  bindData() {
    this.companyForm = this.fb.group({
      name: new FormControl("", [Validators.required])
    });
  }

  addCompany(company: Company, isValid: boolean) {
    this.isEventFormSubmitted = true;
    if (isValid) {
      company.createdDate = new Date().toDateString();

      if (company.id) {
        this.companyService.editCompany(company.id, company);
        let toast = this.toastCtrl.create({
          message: "Update company",
          duration: 2000,
          position: "top"
        });
        toast.present();
      } else {
        this.companyService.addCompany(company);
        let toast = this.toastCtrl.create({
          message: "Successfully add company",
          duration: 2000,
          position: "top"
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
