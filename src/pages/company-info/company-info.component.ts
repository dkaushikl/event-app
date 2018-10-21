import { Component } from '@angular/core';
import { ModalController, NavParams, NavController, FabContainer } from 'ionic-angular';
import { CompanyMemberService, UtilProvider, AuthenticationService, CompanyService, EventService } from '../../core/service';
import { Company, Event } from '../../shared/models';
import { CompanyMemberPage } from '../company-member/company-member.component';
import { ApiResponse } from '../../shared/models/response.model';
import { AddCompanyPage } from '../add-company/add-company.component';
import { AddEventPage } from '../add-event/add-event.component';

@Component({
  selector: 'page-company-info',
  templateUrl: 'company-info.component.html',
})
export class CompanyInfoPage {
  public company: any;
  public companyMemberList = [];
  public companySwitch = 'information';
  public createdBy: string;
  constructor(private modalCtrl: ModalController, private navParams: NavParams, private auth: AuthenticationService,
    private companyMemberService: CompanyMemberService, private util: UtilProvider, private companyService: CompanyService,
    private eventService: EventService, private navCtrl: NavController, ) {
    this.auth.currentUser().then((result) => {
      this.createdBy = result.email;
    });
  }

  onSegmentChange() {
    if (this.companySwitch.toLowerCase() === 'member') {
      this.getCompanyMember();
    }
  }

  getCompanyMember() {
    if (this.companyMemberList !== undefined && this.companyMemberList.length < 0) {
      this.util.showLoader();
    }
    this.companyMemberService.getCompanyMember(this.company.id).subscribe((data: ApiResponse) => {
      if (this.companyMemberList !== undefined && this.companyMemberList.length > 0) {
        this.util.disableLoader();
      }
      this.companyMemberList = data.Data;
    });
  }

  ionViewWillEnter() {
    this.company = this.navParams.data;
  }

  addEvent(fab: FabContainer) {
    const modal = this.modalCtrl.create(AddEventPage, { company: this.company });
    modal.onDidDismiss((data: Event) => {
      fab.close();
      if (data) {
        this.util.showLoader();
        this.eventService.addEvent(data).subscribe((result: ApiResponse) => {
          this.util.disableLoader();
          this.util.showToast(result.Message);
        });
      }
    });
    modal.present();
  }

  AddCompanyMember() {
    const modal = this.modalCtrl.create(CompanyMemberPage, { company: this.company });
    modal.present();
    modal.onDidDismiss((data: any) => {
      if (data) {
        this.util.showLoader();
        this.companyMemberService.addCompanyMember(data).subscribe((result: ApiResponse) => {
          this.util.disableLoader();
          this.util.showToast(result.Message);
          this.getCompanyMember();
        });
      }
    });
  }

  deleteCompany(fab: FabContainer) {
    fab.close();
    this.util.showAlert(
      'Remove Company',
      `Are you sure to delete '${this.company.name}'?`,
      [
        { text: 'Cancel', handler: () => this.util.showToast('your data is safe :)') },
        {
          text: 'Remove',
          handler: () => {
            this.util.showLoader();
            this.companyService
              .deleteCompany(this.company.id)
              .subscribe((data: ApiResponse) => {
                this.util.disableLoader();
                this.util.showToast(data.Message);
                this.navCtrl.pop();
              });
          }
        }
      ]
    );
  }

  editCompany(company: Company, fab: FabContainer) {
    company.email = this.company.companyEmail;
    company.mobileno = this.company.mobileNo;
    company.id = this.company.id;
    const modal = this.modalCtrl.create(AddCompanyPage, { company });
    modal.onDidDismiss((data: Company) => {
      fab.close();
      if (data) {
        this.util.showLoader();
        this.companyService.updateCompany(data).subscribe((result: ApiResponse) => {
          this.company.companyEmail = data.email;
          this.company.mobileNo = data.mobileno;
          this.company.address = data.address;
          this.company.city = data.city;
          this.company.country = data.country;
          this.company.state = data.state;
          this.util.disableLoader();
          this.util.showToast(result.Message);
        });
      }
    });
    modal.present();
  }
}
