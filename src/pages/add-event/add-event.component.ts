import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuController, NavController, ViewController, NavParams } from 'ionic-angular';
import { Event } from '../../shared/models';

@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.component.html'
})
export class AddEventPage {
  private company: any;
  public event: Event;
  isEventFormSubmitted = false;
  eventForm: FormGroup;
  editMode = false;

  constructor(public fb: FormBuilder, public navParams: NavParams, public navCtrl: NavController, public menuCtrl: MenuController,
    public viewCtrl: ViewController) {
    this.company = this.navParams.data.company;
    this.bindData();
  }

  bindData() {
    this.eventForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      vanue: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      startTime: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      endTime: new FormControl('', [Validators.required])
    });
  }

  addEvent(obj: Event, isValid: boolean) {
    this.isEventFormSubmitted = true;
    if (isValid) {
      this.isEventFormSubmitted = false;
      if (this.editMode) {
        this.viewCtrl.dismiss({
          id: obj.id,
          companyId: this.company ? this.company.id : 0,
          name: obj.name,
          description: obj.description,
          price: obj.price,
          startDate: obj.startDate,
          startTime: obj.startTime,
          endDate: obj.endDate,
          endTime: obj.endTime,
        });
      } else {
        this.viewCtrl.dismiss({
          name: obj.name,
          companyId: this.company ? this.company.id : 0,
          description: obj.description,
          vanue: obj.vanue,
          price: obj.price,
          startDate: obj.startDate,
          startTime: obj.startTime,
          endDate: obj.endDate,
          endTime: obj.endTime,
        });
      }
    }
  }

  cancel() {
    this.navCtrl.pop();
  }
}
