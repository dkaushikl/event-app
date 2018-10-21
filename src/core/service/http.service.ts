import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class HttpService {
  token: string;

  constructor(private storage: LocalStorageService) {
    this.getToken();
  }

  GetAuthHttpCommon() {
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

  GetHttpJson() {
    return {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
  }

  getToken() {
    this.storage.get('currentUser').then((data) => {
      this.token = data && data.token;
    });
  }
}
