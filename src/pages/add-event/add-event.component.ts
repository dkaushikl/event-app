import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.component.html',
})

export class AddEventPage {
  public event: event;
  isEventFormSubmitted = false;
  eventList: AngularFireList<any>;
  eventForm: FormGroup;
  constructor(private toastCtrl: ToastController, public fb: FormBuilder, public navCtrl: NavController, db: AngularFireDatabase) {
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

  addEvent(event, isValid) {
    this.isEventFormSubmitted = true;
    if (isValid) {
      const data = {
        title: event.title,
        description: event.description,
        startDate: event.startDate,
        endDate: event.endDate
      }
      const result = this.eventList.push(data);
      var eventId = result.key;
      let toast = this.toastCtrl.create({
        message: 'Successfully add event' + eventId,
        duration: 2000,
        position: 'top'
      });
      toast.present();
      this.isEventFormSubmitted = false;
      this.navCtrl.pop();
    }
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
