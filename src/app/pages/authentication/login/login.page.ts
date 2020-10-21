import { Component, OnInit, NgZone  } from "@angular/core";
import { CrudProductService } from '../../../services/crud-database';
import { CrudStorageService } from '../../../services/crud-storage.service';
import { User } from "../../../models/user.model";
import { AuthenticationService } from "../../../services/authentication.service";
import {Route, Router} from "@angular/router"

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  user = {} as User;
  userSearch = {} as User ;
  // userStorage: any
  constructor(
    private authentication: AuthenticationService,
    public storage: CrudStorageService,
    private cruddatabase: CrudProductService,
    private router: Router
   
    ) {
     this.storage.readUser("person").then(value => {
       if(value.length > 0){
         window.location.href = "/home"
       }
     })
    }

  ngOnInit() {
    
  }

   login(user) {
   
    // user.email = "1714245ctk41@gmail.com";
    // user.password = "1714245ctk41";
    this.authentication.user.email = user.email;
    this.authentication.user.password = user.password;
    // this.authentication.user.returnSecureToken = true;

    // var header: = new URLRequestHeader("Content-Type", "application/json");
     this.authentication.login(user);
    this.cruddatabase.getUser('user').then(value=>{
      value.docs.forEach(value=>{
        if(value.data().email == user.email){
        
          this.userSearch ={
             userid: value.data().userid,
  email: value.data().email,
  password: value.data().password,
  name: value.data().name,
  sdt: value.data().sdt,
  address: value.data().address,
  totalcart: value.data().totalcart,         
 } ;
          
          if(this.storage.readUser('person')){
           
            this.storage.delete('person');
            this.storage.createUser('person', this.userSearch);
          }
         window.location.href = "/home"

        }
      })
    })
    // await this.authentication.getUser_info(user);
   
  }
   async loginWithGoogle() {
        await this.authentication.signInWithGoogle().then((res)=>{
           let userStorage = {
              userid: res.uid,
              email: res.email,   
              name: res.displayName,
              sdt: parseInt(res.phoneNumber),   
              totalcart: "0",
              address: "Nhập địa chỉ",
              password: "google email"

              // like: [],
            };
              this.cruddatabase.addUser(userStorage, res.uid, 'user');   
               

              if(this.storage.readUser('person')){
           
                this.storage.delete('person');
                this.storage.createUser('person', userStorage);
              }
         window.location.href = "/home"

            
    })
  }
}
