import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { MenuController, NavController, ToastController } from 'ionic-angular';
import { Event } from '../../model/events';

@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.component.html'
})
export class AddEventPage {
  public event: Event;
  isEventFormSubmitted = false;
  eventList: AngularFireList<any>;
  eventForm: FormGroup;
  constructor(private toastCtrl: ToastController, public fb: FormBuilder, public navCtrl: NavController,
    db: AngularFireDatabase, public menuCtrl: MenuController) {
    this.menuCtrl.enable(false, 'myMenu');
    this.eventList = db.list('event');
    this.bindData();
  }

  bindData() {
    this.eventForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('')
    });
  }

  addEvent(obj: Event, isValid: boolean) {
    this.isEventFormSubmitted = true;
    if (isValid) {
      const data = {
        title: obj.title,
        description: obj.description,
        startDate: obj.startDate,
        endDate: obj.endDate,
      };
      const result = this.eventList.push(data);
      const eventId = result.key;
      const toast = this.toastCtrl.create({
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
