import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
@Injectable()
export class AuthService {
  // private user: firebase.User;
  authState: firebase.User;
  logged: boolean;
  constructor(public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe((auth: any) => {
      this.authState = auth;
      this.logged = auth;
    });
  }

  signUp(credentials) {
    return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
  }

  signInWithGoogle() {
    // According to the platform, select the best login approach
    //  if(this.platformSrv.is('cordova') && this.platformSrv.is('mobile')) {
    //   // Native login - Google account selector
    //   return this.nativeLoginWithGoogleAccountSelector();
    // } else {
    //   // Web Login - Firebase
    //   return this.firebaseLoginWithGoogle();
    // }
    // return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  signInWithEmail(credentials) {
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
  }

  getAuthenticated(): boolean {
    return this.authState !== null;
  }

  getUserObservable() {
    return this.afAuth.authState;
  }

  getCurrentUser() {
    return (this.authState !== null) ? this.authState : null;
  }

  getEmail() {
    return this.authState && this.authState.email;
  }

  getUserId() {
    return (this.authState !== null) ? this.authState.uid : '';
  }

  signOut() {
    return this.afAuth.auth.signOut();
  }

  resetPassword(emailAddress: string) {
    return Observable.create(observer => {
      this.afAuth.auth.sendPasswordResetEmail(emailAddress).then(function (success) {
        observer.next(success);
      }, function (error) {
        observer.error(error);
      });
    });
  }
}
