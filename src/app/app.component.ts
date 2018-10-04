import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Nav, Platform, Events, MenuController } from 'ionic-angular';
import { EventListPage } from '../pages/event-list/event-list.component';
import { ProfilePage } from '../pages/profile/profile.component';
import { CompanyListPage } from '../pages/company-list/company-list.component';
import { WelcomePage } from '../pages/welcome/welcome.component';
import { HomePage } from '../pages/home/home.component';
import { AuthenticationService, LocalStorageService } from '../core/service';

@Component({
  templateUrl: 'app.component.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  activePage: any;
  pages: Array<{ title: string, icon: string, component: any }>;

  constructor(public auth: AuthenticationService, public platform: Platform, public statusBar: StatusBar,
    public splashScreen: SplashScreen, public events: Events, public menu: MenuController, private storage: LocalStorageService) {

    this.storage.get('email').then((hasEmail) => {
      if (hasEmail === '' || hasEmail === null) {
        this.rootPage = WelcomePage;
      } else {
        this.rootPage = CompanyListPage;
      }
      this.platformReady();
    });

    this.pages = [
      { title: 'Home', icon: 'fa-home', component: HomePage },
      { title: 'Event', icon: 'fa-calendar', component: EventListPage },
      { title: 'Company', icon: 'fa-building-o', component: CompanyListPage },
      { title: 'Profile', icon: 'fa-user', component: ProfilePage },
      { title: 'Logout', icon: 'fa-sign-out', component: null },
    ];

    this.auth.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn === true);
    });

    this.enableMenu(true);
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
    this.nav.setRoot(WelcomePage, {}, { animate: true, direction: 'forward' });
  }
}
