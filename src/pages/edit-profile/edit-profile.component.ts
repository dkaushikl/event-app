import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthenticationService, UtilProvider } from '../../core/service';
import { ApiResponse } from '../../shared/models/response.model';
import { ApiResponseStatus } from '../../shared/enum/response-status.enum';
import { ProfilePage } from '../profile/profile.component';

@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.component.html',
})

export class EditProfilePage {
  user: any;
  isUpdating = false;

  constructor(private navCtrl: NavController, private navParams: NavParams, private auth: AuthenticationService,
    private util: UtilProvider) {
  }

  ionViewDidLoad() {
    this.user = this.navParams.data;
  }

  async submitForm() {
    this.isUpdating = true;
    this.util.showLoader();
    this.auth.updateProfile(this.user).subscribe((data: ApiResponse) => {
      this.util.showToast(data.Message);
      this.isUpdating = false;
      this.util.disableLoader();
      if (data.ResponseStatus === ApiResponseStatus.Ok) {
        this.navCtrl.setRoot(ProfilePage, {}, { animate: true, direction: 'forward' });
      }
    });
  }
}
