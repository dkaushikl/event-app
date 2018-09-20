import { NgModule } from '@angular/core';
import { AuthService, CompanyMemberService, CompanyService, EventService, UtilProvider } from './service';

const service = [AuthService, CompanyService, CompanyMemberService, EventService, UtilProvider];

@NgModule({
  providers: [
    ...service,
  ]
})

export class CoreModule { }
