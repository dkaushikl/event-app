import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { MenuController, ItemSliding, ModalController, NavController } from 'ionic-angular';
import { AuthService } from '../../core/auth.service';
import { CompanyService } from '../../core/company.service';
import { AddCompanyPage } from '../add-company/add-company.component';
import { CompanyMemberPage } from '../company-member/company-member.component';
import { UtilProvider } from '../../core/util';
import { Company } from '../../models';
@Component({
  selector: 'page-company-list',
  templateUrl: 'company-list.component.html',
})
export class CompanyListPage {
  company: Company;
  companyList: Company[];
  userId: string;

  constructor(private modalCtrl: ModalController, public menuCtrl: MenuController, public navCtrl: NavController,
    public db: AngularFireDatabase, public companyService: CompanyService, public auth: AuthService, public util: UtilProvider) {
    this.menuCtrl.enable(true, 'myMenu');
    this.userId = this.auth.getUserId();
  }

  ionViewDidLoad() {
    this.companyService.getCompanies().subscribe(companies => {
      this.companyList = companies;
    });
    this.menuCtrl.enable(true, 'myMenu');
  }

  goToCompanyMember() {
    this.navCtrl.push(CompanyMemberPage);
  }

  addCompany() {
    const modal = this.modalCtrl.create(AddCompanyPage);
    modal.onDidDismiss((data: Company) => {
      if (data) {
        data.createdDate = new Date().toDateString();
        data.createdBy = this.auth.getUserId();
        this.companyService.addCompany(data);
        this.util.showToast('Company added successfully!');
      }
    });
    modal.present();
  }

  editCompany(company: Company) {
    const modal = this.modalCtrl.create(AddCompanyPage, { company });
    modal.onDidDismiss((data: Company) => {
      if (data) {
        data.createdDate = new Date().toDateString();
        data.createdBy = this.auth.getUserId();
        this.companyService.updateCompany(data.key, data)
          .then(() => this.util.showToast(`Company ${company.name} edited successfully!`))
          .catch(e => this.util.showToast('Error: ' + e));
      }
    });
    modal.present();
  }

  deleteCompany(slidingItem: ItemSliding, company: Company) {
    this.util.showAlert(
      'Remove Company',
      `Are you sure to delete "${company.name}"?`,
      [
        { text: 'Cancel', handler: () => slidingItem.close() },
        {
          text: 'Remove', handler: () => {
            this.companyService.deleteCompany(company.key)
              .then(() => {
                slidingItem.close();
                this.util.showToast(`"${company.name}" was removed successfully!`);
              })
              .catch(e => this.util.showToast('Error: ', e));
          }
        }
      ]
    );
  }
}
