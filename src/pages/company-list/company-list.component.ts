import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { MenuController, NavController } from 'ionic-angular';
import { AuthService } from '../../core/auth.service';
import { CompanyService } from '../../core/company.service';
import { Company } from '../../model/events';
import { SharedProvider } from '../../shared/shared.provider';
import { AddCompanyPage } from '../add-company/add-company.component';
import { CompanyMemberPage } from '../company-member/company-member.component';
@Component({
  selector: 'page-company-list',
  templateUrl: 'company-list.component.html',
})
export class CompanyListPage {
  company: Company;
  companyList: Company[];
  userId: string;

  constructor(public menuCtrl: MenuController, public navCtrl: NavController, public db: AngularFireDatabase,
    public companyService: CompanyService, public auth: AuthService, public shared: SharedProvider) {
    this.menuCtrl.enable(true, 'myMenu');
    this.userId = this.auth.getUserId();
  }

  ionViewDidLoad() {
    this.companyService.getCompanies().subscribe(companies => {
      this.companyList = companies;
    });
    this.menuCtrl.enable(true, 'myMenu');
  }

  addCompany() {
    this.navCtrl.push(AddCompanyPage);
  }

  goToCompanyMember() {
    this.navCtrl.push(CompanyMemberPage);
  }

  editCompany(company: Company) {
    this.company = new Company();
    this.company = company;
    this.navCtrl.push(AddCompanyPage, this.company);
  }

  deleteCompany(id) {
    this.shared.Alert.confirm(
      'Delete Company',
      'Are you sure you want to delete this item?')
      .then(() => {
        this.companyService.deleteCompany(id);
        this.shared.Toast.show('delete successfully');
      }).catch(() => {
        this.shared.Toast.show('your data is safe.');
      });
  }
}
