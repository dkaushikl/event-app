import { Injectable } from '@angular/core';
import { Event } from '../../shared/models';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class EventService {
  // private apiUrl = 'http://localhost:50554/api/Event';
  private apiUrl = 'http://event-management.azurewebsites.net/api/Event';

  constructor(private http: HttpClient, public httpService: HttpService) { }

  getAllEvent(companyId?: number) {
    return this.http.get(`${this.apiUrl}/GetAllEvent/${companyId}`, this.httpService.getAuthHttpCommon())
      .pipe(catchError(this.httpService.handleError()));
  }

  addEvent(event: Event) {
    return this.http.post(`${this.apiUrl}/InsertEvent`, event, this.httpService.getAuthHttpCommon())
      .pipe(catchError(this.httpService.handleError()));
  }

  updateEvent(event: Event) {
    return this.http.post(`${this.apiUrl}/UpdateEvent`, event, this.httpService.getAuthHttpCommon())
      .pipe(catchError(this.httpService.handleError()));
  }

  deleteEvent(id: string) {
    const obj = { id: id };
    return this.http.post(`${this.apiUrl}/DeleteEvent`, obj, this.httpService.getAuthHttpCommon())
      .pipe(catchError(this.httpService.handleError()));
  }
}
