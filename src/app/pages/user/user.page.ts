import { Component } from '@angular/core';
import { CrudProductService } from "../../services/crud-database";
import { NavController } from "@ionic/angular";
import {CrudStorageService} from "../../services/crud-storage.service";
import { User } from "../../models/user.model";
@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage {
public userShowInfo: User
  constructor(   private userService:CrudProductService,
    private nav:NavController,
      private crudStorageService : CrudStorageService) { 
        this.crudStorageService.readUser('person').then(value => {
      this.userShowInfo = value[0];
      })
    }

  goToLogin(){
    this.nav.navigateRoot('/login');
  }
}
