import { Injectable, NgZone } from "@angular/core";
// import { HttpClient } from "@angular/common/http";
// import { map, tap, switchMap } from "rxjs/operators";
// import { BehaviorSubject, from, Observable, Subject } from "rxjs";
import { User } from "../models/user.model";
import { AngularFireAuth } from "@angular/fire/auth";
import { Storage } from "@ionic/storage";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { Router } from "@angular/router";
import {CrudProductService} from './crud-database';

import {
  LoadingController,
  NavController,
  ToastController,
} from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  // Init with null to filter out the first value in a guard!
  user = {} as User;
  public user_info = {};  
  userData : any;
  

  constructor(
    public storage: Storage,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,  
    public ngZone: NgZone,
         private userService:CrudProductService,
  ) {
     this.ngFireAuth.authState.subscribe(user => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
        } else {
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
        }
      })
  }

  async setStorage(key: string, value: User) {
    await this.storage.set(key, value);
  }
  async readStorage(key: string): Promise<{ value: any }> {
    return await this.storage.get(key);
  }
  async removeStorage(key: string) {
    await this.storage.remove(key);
  }
  async login(user: User) {
    if (this.formValidation()) {
      //show loader
      let loader = this.loadingCtrl.create({
        message: "Please wait...",
      });
      (await loader).present();

      try {
        await this.ngFireAuth
          .signInWithEmailAndPassword(user.email, user.password)
         
          this.navCtrl.navigateRoot("/home");

      } catch (error) {
        this.showToast(error);
      }

      //dismiss loader
      (await loader).dismiss();
    }
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('person'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // SignOut() {
  //   return this.ngFireAuth.idToken

  //   // auth.signOut().then(() => {
  //   //   localStorage.removeItem('user');
  //   //   this.router.navigate(['login']);
  //   // })
  // }



  formValidation() {
    if (!this.user.email) {
      this.showToast("Enter email");
      return false;
    }
    if (!this.user.password) {
      this.showToast("Enter password");
      return false;
    }
    return true;
  }
  signInWithGoogle = async() => {
    const {user} = await this.ngFireAuth.signInWithPopup(new auth.GoogleAuthProvider());
     this.navCtrl.navigateRoot("/home");
    return user;
  };
    logoutUser(){
      return new Promise((resolve, reject) => {
      if (this.ngFireAuth.currentUser) {
        this.ngFireAuth
          .signOut()
          .then(() => {
      
            resolve();
          })
          .catch((error) => {
            reject();
          });
      }
    });
    }


  showToast(message: string) {
    this.toastCtrl
      .create({
        message: message,
        duration: 3000,
      })
      .then((toastData) => toastData.present());
  }
}
