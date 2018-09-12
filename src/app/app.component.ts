import { LoginPage } from './../pages/login/login.component';
import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Nav, Platform } from 'ionic-angular';
import { EventListPage } from '../pages/event-list/event-list.component';
import { AuthService } from '../core/auth.service';
// import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.component.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage;
  activePage: any;
  pages: Array<{ title: string, icon: string, component: any }>;
  userEmail: string;
  constructor(public auth: AuthService, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    this.pages = [
      { title: 'Home', icon: 'md-home', component: EventListPage },
      { title: 'Logout', icon: 'md-log-out', component: null },
    ];
    this.userEmail = this.auth.getEmail()
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.auth.afAuth.authState.subscribe(
          user => {
            if (user) {
              this.rootPage = EventListPage;
            } else {
              this.rootPage = LoginPage;
            }
          },
          () => {
            this.rootPage = LoginPage;
          }
        );
    });
  }

  async logout() {
    this.auth.signOut();
    this.nav.setRoot(LoginPage, {}, { animate: true, direction: 'forward' });
  }

  async openPage(page) {
    if (page.component) {
      this.nav.setRoot(page.component);
      this.activePage = page;
    } else {
      this.logout();
    }
  }

  checkActivePage(page): boolean {
    return page === this.activePage;
  }
}
