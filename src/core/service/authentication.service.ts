import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { Register, Login, ForgotPassword, ResetPassword } from '../../shared/models/authentication.model';
import { Events } from 'ionic-angular';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AuthenticationService {
  private apiUrl = 'http://localhost:50554/api/Users';

  constructor(private http: HttpClient, private httpService: HttpService, private storage: LocalStorageService, private events: Events) { }

  Register(obj: Register) {
    this.events.publish('user:signup');
    return this.http.post(`${this.apiUrl}/Register`, obj, this.httpService.GetHttpJson());
  }

  Login(obj: Login) {
    this.events.publish('user:login');
    return this.http.post(`${this.apiUrl}/Login`, obj, this.httpService.GetHttpJson());
  }

  Forgot(obj: ForgotPassword) {
    return this.http.post(`${this.apiUrl}/ForgotPassword/`, obj, this.httpService.GetHttpJson());
  }

  Reset(obj: ResetPassword) {
    return this.http.post(`${this.apiUrl}/ResetPassword/`, obj, this.httpService.GetHttpJson());
  }

  getProfile() {
    return this.http.get(`${this.apiUrl}/GetProfile/`, this.httpService.GetAuthHttpCommon());
  }

  updateProfile(obj: any) {
    return this.http.post(`${this.apiUrl}/EditProfile`, obj, this.httpService.GetAuthHttpCommon());
  }

  AddUserStorage(data) {
    this.storage.set('hasLoggedIn', true);
    this.storage.set('currentUser', data);
  }

  RemoveUserStorage() {
    this.storage.remove('hasLoggedIn');
    this.storage.remove('currentUser');
  }

  hasLoggedIn() {
    return this.storage.get('hasLoggedIn').then((value) => {
      return value === true;
    });
  }

  currentUser() {
    return this.storage.get('currentUser');
  }

  Logout() {
    this.RemoveUserStorage();
    this.events.publish('user:logout');
  }
}
