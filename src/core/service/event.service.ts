import { Injectable } from '@angular/core';

@Injectable()
export class EventService {
  eventList: any;

  getEvents() {
    // return this.database.list('/event', ref => ref.orderByChild('createdDate')).valueChanges();
  }

  addEvent(event: Event) {
    // this.database.list('/event').push(event);

    // const yourRef = this.database.list('event');
    // let userId = "UID",
    //   userInfos = { data: "your user datas" };

    // yourRef.update(userId, userInfos);

    // const users = this.database.object('/users');
    // users.update({ [key]: value });
  }

  editEvent(key: string, event: Event) {
    // this.database.list('/event').update(key, event);
  }

  deleteEvent(key: string) {
    // this.database.list('/event').remove(key);
  }
}
