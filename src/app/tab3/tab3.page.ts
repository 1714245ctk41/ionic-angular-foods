import { Component } from '@angular/core';
import { User } from 'firebase';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
    public userinfo: Array<User> = [];
  constructor(public storage: AuthenticationService) {

  }
 

}
