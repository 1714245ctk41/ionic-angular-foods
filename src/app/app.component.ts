import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { CrudProductService } from "./services/crud-database";
import { AuthenticationService } from "./services/authentication.service";
import { NavController } from "@ionic/angular";
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
<<<<<<< HEAD
        private authService:AuthenticationService,
=======
       private authService:AuthenticationService,
>>>>>>> b8347971d62cb9cfd87e2958ed82cfd8fe877a9b
     private navCtrl:NavController,
     private userService:CrudProductService,
  ) {
    
    this.initializeApp();
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
<<<<<<< HEAD
    logOut(){
=======
     logOut(){
>>>>>>> b8347971d62cb9cfd87e2958ed82cfd8fe877a9b
     this.userService.currentUser=null;
    this.authService.logoutUser();
  }
  logIn(){
    this.navCtrl.navigateRoot("/login");
  }
}
