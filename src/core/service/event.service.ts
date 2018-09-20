import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class EventService {
  eventList: any;
  constructor(public auth: AngularFireAuth, private database: AngularFireDatabase) { }

  getEvents() {
    return this.database.list('/event', ref => ref.orderByChild('createdDate')).valueChanges();
  }

  addEvent(event: Event) {
    this.database.list('/event').push(event);
  }

  editEvent(key: string, event: Event) {
    this.database.list('/event').update(key, event);
  }

  deleteEvent(key: string) {
    this.database.list('/event').remove(key);
  }
}
