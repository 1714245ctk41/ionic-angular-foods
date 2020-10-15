import { Component, OnInit } from "@angular/core";

import { User } from "../../../models/user.model";
import { AuthenticationService } from "../../../services/authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  user = {} as User;

  constructor(private authentication: AuthenticationService) {}

  ngOnInit() {}

  async login(user) {
    user.email = "1714245ctk41@gmail.com";
    user.password = "1714245ctk41";
    this.authentication.user.email = user.email;
    this.authentication.user.password = user.password;
    await this.authentication.login(user);
    // await this.authentication.getUser_info(user);
  }
}
