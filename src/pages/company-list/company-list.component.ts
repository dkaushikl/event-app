import { Component } from '@angular/core';
import { MenuController, ModalController, NavController } from 'ionic-angular';
import { AddCompanyPage } from '../add-company/add-company.component';
import { Company } from '../../shared/models';
import { CompanyInfoPage } from '../company-info/company-info.component';
import { CompanyService, UtilProvider } from '../../core/service';
import { ApiResponse } from '../../shared/models/response.model';

@Component({
  selector: 'page-company-list',
  templateUrl: 'company-list.component.html'
})
export class CompanyListPage {
  companyList: any;

  constructor(
    private modalCtrl: ModalController,
    private menuCtrl: MenuController,
    private navCtrl: NavController,
    private companyService: CompanyService,
    private util: UtilProvider
  ) { }

  ionViewDidLoad() {
    this.getAllCompany();
    this.menuCtrl.enable(true, 'myMenu');
  }

  getAllCompany() {
    this.util.showLoader();
    this.companyService.getCompanies().subscribe((data: ApiResponse) => {
      this.companyList = data.Data;
      this.util.disableLoader();
    });
  }

  goToCompanyInfo(company: Company) {
    this.navCtrl.push(CompanyInfoPage, company);
  }

  addCompany() {
    const modal = this.modalCtrl.create(AddCompanyPage);
    modal.onDidDismiss((data: Company) => {
      if (data) {
        this.util.showLoader();
        this.companyService.addCompany(data).subscribe((data: ApiResponse) => {
          this.util.showToast(data.Message);
        });
      }
    });
    modal.present();
  }
}
