import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AddCompanyPage } from '../pages/add-company/add-company.component';
import { AddEventPage } from '../pages/add-event/add-event.component';
import { CompanyListPage } from '../pages/company-list/company-list.component';
import { CompanyMemberPage } from '../pages/company-member/company-member.component';
import { EventDetailPage } from '../pages/event-detail/event-detail.component';
import { EventListPage } from '../pages/event-list/event-list.component';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password.component';
import { HomePage } from '../pages/home/home.component';
import { ProfilePage } from '../pages/profile/profile.component';
import { LoginPage } from './../pages/login/login.component';
import { RegisterPage } from './../pages/register/register.component';
import { CompanyInfoPage } from '../pages/company-info/company-info.component';
import { ResetPasswordPage } from '../pages/reset-password/reset-password.component';
import { EditProfilePage } from '../pages/edit-profile/edit-profile.component';
import { ChangePasswordPage } from '../pages/change-password/change-password.component';
import { PrivacyPage } from '../pages/privacy/privacy.component';
import { AboutPage } from '../pages/about/about.component';
import { MyApp } from './app.component';

import { SharedModule } from '../shared';
import { CoreModule } from '../core';


const page = [EventListPage, EventDetailPage, AddEventPage, LoginPage, RegisterPage, AddCompanyPage, CompanyListPage, ChangePasswordPage,
  CompanyMemberPage, ProfilePage, ForgotPasswordPage, HomePage, CompanyInfoPage, ResetPasswordPage, EditProfilePage,
  AboutPage, PrivacyPage];

@NgModule({
  declarations: [
    MyApp,
    ...page
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ...page
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})
export class AppModule { }
