import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Events } from 'ionic-angular';
import { LocalStorageService } from './local-storage.service';
import { UtilProvider } from './util';

import { Observable } from 'rxjs/internal/observable';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class HttpService {
  token: string;

  constructor(private storage: LocalStorageService, private events: Events, private util: UtilProvider) {
    this.getToken();
  }

  getAuthHttpCommon() {
    if (this.token === undefined || this.token === null) {
      this.getToken();
      return {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Content-Type', 'application/json')
      };
    } else {
      return {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Content-Type', 'application/json')
      };
    }
  }

  getHttpJson() {
    return {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
  }

  getToken() {
    this.storage.get('currentUser').then((data) => {
      this.token = data && data.token;
    });
  }

  public handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      this.util.showToast('Something went wrong, please try again!!');
      this.util.disableLoader();
      this.logout();
      console.error(error);
      return of(result as T);
    };
  }

  public handleErrors<T>(result?: T) {
    return () => {
      this.util.showToast('Something went wrong, please try again!!');
      this.util.disableLoader();
      return of(result as T);
    };
  }

  public logout() {
    this.storage.remove('hasLoggedIn');
    this.storage.remove('currentUser');
    this.events.publish('user:logout');
  }
}
