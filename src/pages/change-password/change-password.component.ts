import { Component } from '@angular/core';
import { AuthenticationService, UtilProvider } from '../../core/service';
import { ApiResponse } from '../../shared/models/response.model';
import { ChangePassword } from '../../shared/models/authentication.model';
import { ApiResponseStatus } from '../../shared/enum/response-status.enum';

@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.component.html',
})

export class ChangePasswordPage {
  user: ChangePassword;
  isUpdating = false;

  constructor(private auth: AuthenticationService, private util: UtilProvider) {
    this.user = new ChangePassword();
  }

  async submit() {
    this.isUpdating = true;
    this.util.showLoader();
    this.auth.changePassword(this.user).subscribe((data: ApiResponse) => {
      this.util.showToast(data.Message);
      this.isUpdating = false;
      this.util.disableLoader();
      if (data.ResponseStatus === ApiResponseStatus.Ok) {
        this.user.oldPassword = '';
        this.user.newPassword = '';
      }
    });
  }
}

