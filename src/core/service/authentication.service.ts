import { Injectable, Output, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpService } from "./http.service";
import { Register, Login, ForgotPassword, ResetPassword } from '../../shared/models/authentication.model';

@Injectable()
export class AuthenticationService {
  private apiUrl = 'http://localhost:50554/api/Users';
  @Output() username: EventEmitter<any> = new EventEmitter();
  @Output() isLogin: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient, public httpService: HttpService) { }

  Register(obj: Register) {
    return this.http.post(`${this.apiUrl}/Register`, obj, this.httpService.GetHttpJson());
  }

  Login(obj: Login) {
    return this.http.post(`${this.apiUrl}/Login`, obj, this.httpService.GetHttpJson());
  }

  Forgot(obj: ForgotPassword) {
    return this.http.post(`${this.apiUrl}/ForgotPassword/${obj.email}`, this.httpService.GetHttpJson());
  }

  Reset(obj: ResetPassword) {
    return this.http.post(`${this.apiUrl}/ResetPassword`, JSON.stringify(obj), this.httpService.GetHttpJson());
  }

  CheckUserLoggedIn(): boolean {
    if (localStorage.getItem("currentUser")) {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      this.username.emit(currentUser.fullname);
      this.isLogin.emit(true);
      return true;
    }
    this.username.emit("");
    this.isLogin.emit(false);
    return false;
  }

  GetUserName(): string {
    if (localStorage.getItem("currentUser")) {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      return currentUser.Firstname === null || currentUser.Lastname === null
        ? currentUser.Email
        : currentUser.Firstname + " " + currentUser.Lastname;
    }
    return "";
  }

  Logout() {
    localStorage.removeItem("currentUser");
    this.CheckUserLoggedIn();
  }
}
