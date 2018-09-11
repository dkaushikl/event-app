import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { EventService } from '../core/event.service'

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
import { AddEventPage } from '../pages/add-event/add-event.component';
import { EventListPage } from '../pages/event-list/event-list.component';
import { EventDetailPage } from '../pages/event-detail/event-detail.component';

export const firebaseConfig = {
  apiKey: "AIzaSyCOhwNHsYRh8PT49djMQkvfXKI9kbQahDo",
  authDomain: "event-app-1234.firebaseapp.com",
  databaseURL: "https://event-app-1234.firebaseio.com",
  projectId: "event-app-1234",
  storageBucket: "event-app-1234.appspot.com",
  messagingSenderId: "991073427296"
};

@NgModule({
  declarations: [
    MyApp,
    EventListPage,
    EventDetailPage,
    AddEventPage
  ],
  imports: [
    // Angular
    BrowserModule,
    HttpClientModule,
    // Ionic
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EventListPage,
    EventDetailPage,
    AddEventPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    EventService,
    AngularFireDatabase,
    AngularFirestore,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})
export class AppModule { }
