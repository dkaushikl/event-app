import { Component } from '@angular/core';
import { ModalController, NavParams } from 'ionic-angular';
import { AuthService, CompanyMemberService, UtilProvider } from '../../core/service';
import { Company, CompanyMember } from '../../shared/models';
import { CompanyMemberPage } from '../company-member/company-member.component';

@Component({
  selector: 'page-company-info',
  templateUrl: 'company-info.component.html',
})
export class CompanyInfoPage {
  private company: Company;
  public companyMemberList: CompanyMember[];
  public companySwitch = 'information';
  constructor(private auth: AuthService, private modalCtrl: ModalController, private navParams: NavParams,
    private companyMemberService: CompanyMemberService, private util: UtilProvider) {
  }

  ionViewWillEnter() {
    this.company = this.navParams.data;
    this.loadCompanyMember(true);
  }

  refreshAll(refresher) {
    this.loadCompanyMember(true);
    refresher.complete();
  }

  private loadCompanyMember(isForce) {
    this.companyMemberService.getCompanyMember().subscribe(companyMember => {
      this.companyMemberList = companyMember;
    });
  }

  async AddCompanyMember() {
    const modal = this.modalCtrl.create(CompanyMemberPage, { company: this.company });
    await modal.present();

    modal.onDidDismiss((data: any) => {
      if (data) {
        data.createdDate = new Date().toDateString();
        data.createdBy = this.auth.getUserId();
        this.companyMemberService.addCompanyMember(data);
        this.util.showToast('Company member added successfully!');
      }
    });
  }
}
