import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { MenuController, ItemSliding, ModalController, NavController } from 'ionic-angular';
import { AuthService } from '../../core/auth.service';
import { CompanyService } from '../../core/company.service';
import { AddCompanyPage } from '../add-company/add-company.component';
import { UtilProvider } from '../../core/util';
import { Company } from '../../models';
import { CompanyInfoPage } from '../company-info/company-info.component';
@Component({
  selector: 'page-company-list',
  templateUrl: 'company-list.component.html',
})

export class CompanyListPage {
  public companyList: Company[];
  public userId: string;
  private companyListAll: Company[];
  private queryText: string;

  constructor(private modalCtrl: ModalController, private menuCtrl: MenuController, private navCtrl: NavController,
    private companyService: CompanyService, private auth: AuthService, private util: UtilProvider) {
  }

  ionViewDidLoad() {
    this.loadCompany(true);
    this.userId = this.auth.getUserId();
    this.menuCtrl.enable(true, 'myMenu');
  }

  refreshAll(refresher) {
    this.loadCompany(false);
    refresher.complete();
  }

  private loadCompany(isForce) {
    this.companyService.getCompanies(isForce).subscribe(companies => {
      this.companyList = this.companyListAll = companies;
    });
  }

  goToCompanyInfo(company: Company) {
    this.navCtrl.push(CompanyInfoPage, company);
  }

  addCompany() {
    const modal = this.modalCtrl.create(AddCompanyPage);
    modal.onDidDismiss((data: Company) => {
      if (data) {
        data.createdDate = new Date().toDateString();
        data.createdBy = this.userId;
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
        data.createdBy = this.userId;
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

  updateCompany() {
    const queryTextLower = this.queryText.toLowerCase();
    if (queryTextLower.trim() !== '') {
      this.companyList = this.companyListAll.filter((item) => {
        return item.name.toLowerCase().indexOf(queryTextLower.toLowerCase()) > -1;
      });
    } else {
      this.companyList = this.companyListAll;
    }
  }
}
