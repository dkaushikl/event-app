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

    // const yourRef = this.database.list('event');
    // let userId = "UID",
    //   userInfos = { data: "your user datas" };

    // yourRef.update(userId, userInfos);

    // const users = this.database.object('/users');
    // users.update({ [key]: value });
  }

  editEvent(key: string, event: Event) {
    this.database.list('/event').update(key, event);
  }

  deleteEvent(key: string) {
    this.database.list('/event').remove(key);
  }
}
