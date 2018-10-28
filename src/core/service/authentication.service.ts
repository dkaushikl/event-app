import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { Login, ForgotPassword, ResetPassword, Register } from '../../shared/models/authentication.model';
import { Events } from 'ionic-angular';
import { LocalStorageService } from './local-storage.service';
import { map } from 'rxjs/operators/map';
import { ApiResponseStatus } from '../../shared/enum/response-status.enum';
import { ApiResponse } from '../../shared/models/response.model';

import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class AuthenticationService {
  // private apiUrl = 'http://localhost:50554/api/Users';
  private apiUrl = 'http://event-management.azurewebsites.net/api/Users';

  constructor(private http: HttpClient, private httpService: HttpService, private storage: LocalStorageService, private events: Events) { }

  register(obj: Register) {
    this.events.publish('user:signup');
    return this.http.post(`${this.apiUrl}/Register`, obj, this.httpService.getHttpJson())
      .pipe(map((response: any) => {
        this.addUserStorage(response);
        return response;
      }), catchError(this.httpService.handleErrors()));
  }

  login(obj: Login) {
    this.events.publish('user:login');
    return this.http.post(`${this.apiUrl}/Login`, obj, this.httpService.getHttpJson())
      .pipe(map((response: any) => {
        this.addUserStorage(response);
        return response;
      }), catchError(this.httpService.handleErrors()));
  }

  forgot(obj: ForgotPassword) {
    return this.http.post(`${this.apiUrl}/ForgotPassword/`, obj, this.httpService.getHttpJson()).pipe(
      catchError(this.httpService.handleError())
    );
  }

  reset(obj: ResetPassword) {
    return this.http.post(`${this.apiUrl}/ResetPassword/`, obj, this.httpService.getHttpJson()).pipe(
      catchError(this.httpService.handleError())
    );
  }

  changePassword(obj: any) {
    return this.http.post(`${this.apiUrl}/ChangePassword/`, obj, this.httpService.getAuthHttpCommon())
      .pipe(catchError(this.httpService.handleError()));
  }

  getProfile() {
    return this.http.get(`${this.apiUrl}/GetProfile/`, this.httpService.getAuthHttpCommon()).pipe(
      catchError(this.httpService.handleError())
    );
  }

  updateProfile(obj: any) {
    return this.http.post(`${this.apiUrl}/EditProfile`, obj, this.httpService.getAuthHttpCommon()).pipe(
      catchError(this.httpService.handleError())
    );
  }

  private addUserStorage(data: ApiResponse) {
    if (data.ResponseStatus === ApiResponseStatus.Ok) {
      this.storage.set('hasLoggedIn', true);
      this.storage.set('currentUser', data.Data);
      this.httpService.token = data.Data.token;
    }
  }

  private removeUserStorage() {
    this.storage.remove('hasLoggedIn');
    this.storage.remove('currentUser');
  }

  public async hasLoggedIn() {
    const value = await this.storage.get('hasLoggedIn');
    return value === true;
  }

  public currentUser() {
    return this.storage.get('currentUser');
  }

  public logout() {
    this.removeUserStorage();
    this.events.publish('user:logout');
  }
}
