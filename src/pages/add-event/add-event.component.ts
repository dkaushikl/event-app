import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.component.html',
})

export class AddEventPage {
  public event: event;
  eventList: AngularFireList<any>;
  eventForm: FormGroup;
  constructor(public fb: FormBuilder, public navCtrl: NavController, db: AngularFireDatabase) {
    this.event = new event();
    this.eventList = db.list('event');
    this.bindData();
  }

  bindData() {
    this.eventForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl(''),
    });
  }

  addEvent(event) {
    console.log(event);
    // const data = {
    //   name: name,
    //   address: address,
    //   phone: phone,
    //   city: city
    // }
    // this.eventList.push(event);
  }

  goBack() {
    this.navCtrl.pop();
  }
}

export class event {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  id: string;
}
