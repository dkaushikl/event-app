import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { MenuController, NavController, ToastController } from "ionic-angular";
import { event } from "./../../model/event";

@Component({
  selector: "page-add-event",
  templateUrl: "add-event.component.html"
})
export class AddEventPage {
  public event: event;
  isEventFormSubmitted = false;
  eventList: AngularFireList<any>;
  eventForm: FormGroup;
  constructor(
    private toastCtrl: ToastController,
    public fb: FormBuilder,
    public navCtrl: NavController,
    db: AngularFireDatabase,
    public menuCtrl: MenuController
  ) {
    this.menuCtrl.enable(false, 'myMenu');
    this.eventList = db.list("event");
    this.bindData();
  }

  bindData() {
    this.eventForm = this.fb.group({
      title: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      startDate: new FormControl("", [Validators.required]),
      endDate: new FormControl("")
    });
  }

  addEvent(event: event, isValid: boolean) {
    this.isEventFormSubmitted = true;
    if (isValid) {
      const data = {
        title: event.title,
        description: event.description,
        startDate: event.startDate,
        endDate: event.endDate,
      };
      const result = this.eventList.push(data);
      var eventId = result.key;
      let toast = this.toastCtrl.create({
        message: "Successfully add event" + eventId,
        duration: 2000,
        position: "top"
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
