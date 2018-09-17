import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CompanyListPage } from '../company-list/company-list.component';
import { EventListPage } from '../event-list/event-list.component';

@Component({
  selector: 'page-home',
  templateUrl: 'home.component.html',
})
export class HomePage {
  public eventTab = EventListPage;
  public companyTab = CompanyListPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
}
