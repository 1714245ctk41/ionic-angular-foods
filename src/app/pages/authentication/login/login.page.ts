import { Component, OnInit } from "@angular/core";
import { CrudProductService } from 'src/app/services/crud-database';
import { CrudStorageService } from 'src/app/services/crud-storage.service';

import { User } from "../../../models/user.model";
import { AuthenticationService } from "../../../services/authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  user = {} as User;
  userSearch = {} as User ;

  constructor(
    private authentication: AuthenticationService,
    public storage: CrudStorageService,
    private cruddatabase: CrudProductService,
    ) {}

  ngOnInit() {}

  async login(user) {
   
    user.email = "1714245ctk41@gmail.com";
    user.password = "1714245ctk41";
    this.authentication.user.email = user.email;
    this.authentication.user.password = user.password;
    await this.authentication.login(user);
    this.cruddatabase.getUser('user').then(value=>{
      value.docs.forEach(value=>{
        if(value.data().email == user.email){
        
          this.userSearch ={
             id: value.data().id,
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
        }
      })
    })
    // await this.authentication.getUser_info(user);
   
  }
}
