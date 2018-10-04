import { NgModule } from '@angular/core';
import {
  CompanyMemberService, CompanyService, EventService, UtilProvider,
  AuthenticationService, HttpService, LocalStorageService
} from './service';

const service = [AuthenticationService, CompanyService, CompanyMemberService, EventService, HttpService, UtilProvider, LocalStorageService];

@NgModule({
  providers: [
    ...service,
  ]
})

export class CoreModule { }
