import { Component } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';
import { EventService, UtilProvider } from '../../core/service';
import { EventDetailPage } from '../event-detail/event-detail.component';
import { ApiResponse } from '../../shared/models/response.model';

@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.component.html',
})

export class EventListPage {
  eventList = [];

  constructor(private menuCtrl: MenuController,
    private navCtrl: NavController,
    private eventService: EventService,
    private util: UtilProvider) {
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(true, 'myMenu');
    this.getAllEvent();
  }

  getAllEvent() {
    this.util.showLoader();
    this.eventService.getAllEvent(null).subscribe((data: ApiResponse) => {
      this.eventList = data.Data;
      this.util.disableLoader();
    });
  }

  goToEventDetail() {
    this.navCtrl.push(EventDetailPage);
  }
}
