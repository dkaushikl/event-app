import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { AddEventPage } from '../add-event/add-event.component';
import { EventDetailPage } from '../event-detail/event-detail.component';
import { EventService } from '../../core/event.service';

@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.component.html',
})

export class EventListPage {
  eventList: any;

  constructor(public menuCtrl: MenuController, public navCtrl: NavController,
    public eventService: EventService) {
    this.eventService.getEvents().subscribe(event => {
      this.eventList = event;
    });
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(true, 'myMenu');
  }

  addEvent() {
    this.navCtrl.push(AddEventPage);
  }

  goToEventDetail() {
    this.navCtrl.push(EventDetailPage);
  }
}
