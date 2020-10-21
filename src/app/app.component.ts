import { Component,OnInit } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { CrudProductService } from "./services/crud-database";
import { AuthenticationService } from "./services/authentication.service";
import { NavController } from "@ionic/angular";
import {CrudStorageService} from "./services/crud-storage.service";
import { User } from "./models/user.model";
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit{
    public userShowInfo: User
  async ngOnInit(){
    //  (await this.storage.readUser('person')).forEach(value=>{
    //     this.currentUser=value
    //   });
  }
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
       private authService:AuthenticationService,
     private navCtrl:NavController,
     private userService:CrudProductService,
     private crudStorageService : CrudStorageService
  ) {
    
    this.initializeApp();
      this.crudStorageService.readUser('person').then(value => {
      this.userShowInfo = value[0];
  })
}

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
     logOut(){
     this.userService.currentUser=null;
    this.authService.logoutUser();
  }
  logIn(){
    this.navCtrl.navigateRoot("/login");
  }
}
