import { Component, OnInit} from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { CrudProductService } from "./services/crud-database";
import { AuthenticationService } from "./services/authentication.service";
import { NavController } from "@ionic/angular";
import {CrudStorageService} from "./services/crud-storage.service";
import { User } from "./models/user.model";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit{
  userShowInfo: any;

  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
       private authService:AuthenticationService,
     private navCtrl:NavController,
     private userService:CrudProductService,
     private crudStorageService : CrudStorageService,
     private route:ActivatedRoute,
  ) {
    this.initializeApp();
    //    this.crudStorageService.readUser('person').then(value => {
    //   this.userShowInfo = value[0];
    // })
}
ngOnInit(){
  console.log(this.route.snapshot.data);
  this.userShowInfo=this.route.snapshot.data.currentUser;
}


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  
     logOut(){
      this.crudStorageService.delete('person');
    this.authService.logoutUser();
     this.userShowInfo=null;
  }
  logIn(){
    this.navCtrl.navigateRoot("/login");
  }
}
