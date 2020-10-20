import { Component, OnInit } from '@angular/core';
import { CrudProductService } from "../../services/crud-database";
import { NavController } from "@ionic/angular";
@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  constructor(
    private userService:CrudProductService,
    private nav:NavController,
  ) { }

  ngOnInit() {
  }
  goToLogin(){
    this.nav.navigateRoot('/login');
  }

}
