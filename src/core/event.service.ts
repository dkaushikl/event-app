import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EventService {
  private baseUrl = 'https://event-app-1234.firebaseio.com/';
  constructor(private http: HttpClient) { }

  getEvents() {
    return this.http.get(`${this.baseUrl}/event.json`);
  }
}
