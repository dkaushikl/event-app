import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AddEventPage } from '../add-event/add-event.component';

@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.component.html',
})

export class EventListPage {
  eventList: any[];

  constructor(public navCtrl: NavController, db: AngularFireDatabase) {
    db.list('/event').valueChanges().subscribe(events => {
      this.eventList = events;
    });
  }

  addEvent() {
    this.navCtrl.push(AddEventPage);
  }
}
