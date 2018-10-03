import { NgModule } from '@angular/core';
import { AuthService, CompanyMemberService, CompanyService, EventService, UtilProvider, AuthenticationService, HttpService } from './service';

const service = [AuthService, AuthenticationService, CompanyService, CompanyMemberService, EventService, HttpService, UtilProvider];

@NgModule({
  providers: [
    ...service,
  ]
})

export class CoreModule { }
