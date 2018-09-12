import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AddEventPage } from '../add-event/add-event.component';
import { EventDetailPage } from '../event-detail/event-detail.component';

@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.component.html',
})

export class EventListPage {
  eventList: any[];

  constructor(public menuCtrl: MenuController, public navCtrl: NavController, db: AngularFireDatabase) {
    this.menuCtrl.enable(true, 'myMenu');
    db.list('/event').valueChanges().subscribe(events => {
      this.eventList = events;
    });
  }

  addEvent() {
    this.navCtrl.push(AddEventPage);
  }

  goToEventDetail() {
    this.navCtrl.push(EventDetailPage);
  }
}
