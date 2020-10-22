import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { CrudStorageService } from '../../../services/crud-storage.service';
import {
  LoadingController,
  NavController,
  ToastController,
} from "@ionic/angular";
import { User } from "../../../models/user.model";
import { Product } from "../../../models/product.model";
import { CrudProductService } from "../../../services/crud-database";
import { FormGroup, FormBuilder } from "@angular/forms";
import { AuthenticationService } from "../../../services/authentication.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  user = {} as User;
  product = {} as Product;
  registerForm: FormGroup;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private authentication: AuthenticationService,
    private userService: CrudProductService,
    public fb: FormBuilder, 
    public storage: CrudStorageService,
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      userid: [""],
      email: [""],
      password: [""],
      name: [""],
      sdt: [""],
      address: [""],
      // like: [],
    });

  }


  async register() {
    if (this.formValidation()) {
      //show loader
      let loader = this.loadingCtrl.create({
        message: "Please wait...",
      });

     
      (await loader).present();

      try {
        await this.afAuth
          .createUserWithEmailAndPassword(this.registerForm.get('email').value, this.registerForm.get('password').value)
          .then((data) => {
              
             let userStorage = {
              userid: data.user.uid,
              email: this.registerForm.get('email').value,
              password: this.registerForm.get('password').value,
              name: this.registerForm.get('name').value,
              sdt: this.registerForm.get('sdt').value,
              address: this.registerForm.get('address').value,
              totalcart: "0"
              // like: [],
            };
              this.authentication.setStorage("person", userStorage);
               this.userService.addUser(userStorage, data.user.uid, 'user');
          });
          setTimeout(()=>{
            this.navCtrl.navigateRoot('home');
          },0);
         
      } catch (error) {
        this.showToast(error);
      }

      //dismiss loader
      (await loader).dismiss();
    }
  }

  formValidation() {
    if (!this.registerForm.get('email').value) {
      this.showToast("Enter email");
      return false;
    }
    if (!this.registerForm.get('password').value) {
      this.showToast("Enter password");
      return false;
    }
    if (!this.registerForm.get('name').value) {
      this.showToast("Enter name");
      return false;
    }
    if (!this.registerForm.get('email').value) {
      this.showToast("Enter email");
      return false;
    }
    if (!this.registerForm.get('sdt').value) {
      this.showToast("Enter sdt");
      return false;
    }
    return true;
  }
  goToLogin(){
    this.navCtrl.navigateBack("/login");
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
