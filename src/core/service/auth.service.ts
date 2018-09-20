import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AngularFireObject, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { User } from '../../shared/models';
@Injectable()
export class AuthService {
  authState: firebase.User;
  logged: boolean;
  constructor(public afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    afAuth.authState.subscribe((auth: any) => {
      this.authState = auth;
      this.logged = auth;
    });
  }

  signUp(user: User) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
        .then((result: any) => {
          user.userid = result.user.uid;
          this.setUserData(user);
          resolve(result);
        }, err => reject(err));
    });
  }

  signInWithEmail(credentials) {
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
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

  setUserData(user: User) {
    this.db.object(`users/${user.userid}`).update(user)
      .catch(error => console.log(error));
  }

  getUserByUid(uid: string): AngularFireObject<User> {
    return this.db.object(`/users/${uid}`);
  }

  getUsers(): AngularFireList<User[]> {
    return this.db.list('/users');
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
