import { Injectable } from "@angular/core";
// import { HttpClient } from "@angular/common/http";
// import { map, tap, switchMap } from "rxjs/operators";
// import { BehaviorSubject, from, Observable, Subject } from "rxjs";
import { User } from "../models/user.model";
import { AngularFireAuth } from "@angular/fire/auth";
import { Storage } from "@ionic/storage";
import { auth } from "firebase/app";
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

  constructor(
    public storage: Storage,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private userService:CrudProductService,
  ) {}

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
        await this.afAuth
          .signInWithEmailAndPassword(user.email, user.password)
          .then((data) => {
            this.userService.addUser(user,data.user.uid,'user');
            this.readStorage("person").then((value) => console.log(value));
            // this.getString(data.user.uid).then((data) =>
            //   {console.log(data);}
            // );

            // console.log(Storage.get({ key }));
            //redirect to home page
            this.navCtrl.navigateRoot("/home");
          });
      } catch (error) {
        this.showToast(error);
      }

      //dismiss loader
      (await loader).dismiss();
    }
  }

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
    const {user} = await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
     this.navCtrl.navigateRoot("/home");
    return user;
  };
    logoutUser(){
      return new Promise((resolve, reject) => {
      if (this.afAuth.currentUser) {
        this.afAuth
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
