import { Injectable } from '@angular/core';
import { Event } from '../../shared/models';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';

@Injectable()
export class EventService {
  private apiUrl = 'http://localhost:50554/api/Event';
  constructor(private http: HttpClient, public httpService: HttpService) { }

  getAllEvent(companyId?: number) {
    return this.http.get(`${this.apiUrl}/GetAllEvent/${companyId}`, this.httpService.GetAuthHttpCommon());
  }

  addEvent(event: Event) {
    return this.http.post(`${this.apiUrl}/InsertEvent`, event, this.httpService.GetAuthHttpCommon());
  }

  updateEvent(event: Event) {
    return this.http.post(`${this.apiUrl}/UpdateEvent`, event, this.httpService.GetAuthHttpCommon());
  }

  deleteEvent(id: string) {
    const obj = { id: id };
    return this.http.post(`${this.apiUrl}/DeleteEvent`, obj, this.httpService.GetAuthHttpCommon());
  }
}
