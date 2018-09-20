import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
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
import { WelcomePage } from '../pages/welcome/welcome.component';
import { LoginPage } from './../pages/login/login.component';
import { RegisterPage } from './../pages/register/register.component';
import { CompanyInfoPage } from '../pages/company-info/company-info.component';
import { MyApp } from './app.component';
import { UtilProvider, AuthService, CompanyService, CompanyMemberService, EventService } from '../core';

export const firebaseConfig = {
  apiKey: 'AIzaSyCOhwNHsYRh8PT49djMQkvfXKI9kbQahDo',
  authDomain: 'event-app-1234.firebaseapp.com',
  databaseURL: 'https://event-app-1234.firebaseio.com',
  projectId: 'event-app-1234',
  storageBucket: 'event-app-1234.appspot.com',
  messagingSenderId: '991073427296'
};

const page = [EventListPage, EventDetailPage, AddEventPage, LoginPage, RegisterPage, AddCompanyPage, CompanyListPage,
  CompanyMemberPage, ProfilePage, ForgotPasswordPage, WelcomePage, HomePage, CompanyInfoPage];

const service = [EventService, CompanyService, CompanyMemberService, AuthService, UtilProvider];

@NgModule({
  declarations: [
    MyApp,
    ...page
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ...page
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    AngularFirestore,
    ...service,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})
export class AppModule { }
