import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { Event } from '../../shared/models';
import { UtilProvider, EventService } from '../../core/service';
import { ApiResponse } from '../../shared/models/response.model';
import { ApiResponseStatus } from '../../shared/enum/response-status.enum';

@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.component.html'
})
export class AddEventPage {
  private company: any;
  public event: Event;
  isUpdating = false;
  eventForm: FormGroup;
  editMode = false;

  constructor(private fb: FormBuilder, private navParams: NavParams, private navCtrl: NavController, private viewCtrl: ViewController,
    private util: UtilProvider, private eventService: EventService) {
    this.company = this.navParams.data.company;
    this.bindData();
  }

  bindData() {
    this.eventForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      vanue: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      startTime: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      endTime: new FormControl('', [Validators.required])
    });
  }

  insertUpdateEvent(obj: Event, isValid: boolean) {
    this.isUpdating = true;
    if (isValid) {
      this.util.showLoader();
      if (this.editMode) {
        obj.companyId = this.company ? this.company.id : 0;
        this.eventService.updateEvent(obj).subscribe((result: ApiResponse) => {
          this.isUpdating = false;
          this.util.disableLoader();
          this.util.showToast(result.Message);
          if (result.ResponseStatus === ApiResponseStatus.Ok) {
            this.viewCtrl.dismiss(obj);
          }
        });
      } else {
        obj.companyId = this.company ? this.company.id : 0;
        this.eventService.addEvent(obj).subscribe((result: ApiResponse) => {
          this.isUpdating = false;
          this.util.disableLoader();
          this.util.showToast(result.Message);
          if (result.ResponseStatus === ApiResponseStatus.Ok) {
            this.viewCtrl.dismiss(obj);
          }
        });
      }
    }
  }

  cancel() {
    this.navCtrl.pop();
  }
}
