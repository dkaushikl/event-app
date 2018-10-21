import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Events, MenuController, Nav, Platform } from 'ionic-angular';
import { AuthenticationService } from '../core/service';

import { CompanyListPage } from '../pages/company-list/company-list.component';
import { EventListPage } from '../pages/event-list/event-list.component';
import { HomePage } from '../pages/home/home.component';
import { ProfilePage } from '../pages/profile/profile.component';
import { LoginPage } from '../pages/login/login.component';
import { ChangePasswordPage } from '../pages/change-password/change-password.component';
import { PrivacyPage } from '../pages/privacy/privacy.component';
import { AboutPage } from '../pages/about/about.component';

@Component({
  templateUrl: 'app.component.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  activePage: any;
  pages: Array<{ title: string, icon: string, component: any }>;

  constructor(public auth: AuthenticationService, public platform: Platform, public statusBar: StatusBar,
    public splashScreen: SplashScreen, public events: Events, public menu: MenuController) {

    this.pages = [
      { title: 'Home', icon: 'globe', component: HomePage },
      { title: 'Event', icon: 'calendar', component: EventListPage },
      { title: 'Company', icon: 'contacts', component: CompanyListPage },

      { title: 'Profile', icon: 'person', component: ProfilePage },
      { title: 'Change Password', icon: 'lock', component: ChangePasswordPage },

      { title: 'About', icon: 'information-circle', component: AboutPage },
      { title: 'Privacy', icon: 'contact', component: PrivacyPage },
      { title: 'Logout', icon: 'log-out', component: null },
    ];

    this.auth.hasLoggedIn().then((hasLoggedIn) => {
      this.platformReady();
      this.rootPage = hasLoggedIn ? ProfilePage : LoginPage;
      this.enableMenu(hasLoggedIn === true);
    });

    this.listenToLoginEvents();
  }

  async openPage(page) {
    if (page.component) {
      this.nav.setRoot(page.component);
      this.activePage = page;
    } else {
      this.logout();
    }
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  checkActivePage(page): boolean {
    return page === this.activePage;
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'myMenu');
  }

  platformReady() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }

  logout() {
    this.auth.Logout();
    this.nav.setRoot(LoginPage);
  }
}
