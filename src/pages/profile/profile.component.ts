import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthenticationService, UtilProvider } from '../../core/service';
import { ApiResponse } from '../../shared/models/response.model';
import { ApiResponseStatus } from '../../shared/enum/response-status.enum';
import { EditProfilePage } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.component.html',
})
export class ProfilePage {
  user: any;
  isEdit = false;
  constructor(public auth: AuthenticationService, public navCtrl: NavController, public navParams: NavParams,
    private util: UtilProvider) {
    this.getProfile();
  }

  getProfile() {
    this.util.showLoader();
    this.auth.getProfile().subscribe((data: ApiResponse) => {
      this.util.disableLoader();
      if (data.ResponseStatus === ApiResponseStatus.Ok) {
        this.user = data.Data;
      } else {
        this.util.showToast(data.Message);
      }
    });
  }

  navigateTo() {
    this.navCtrl.push(EditProfilePage, this.user);
  }
}
