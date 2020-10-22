import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import {AuthenticationService} from './authentication.service';
@Injectable({
  providedIn: 'root'
})
export class UserResolveService implements Resolve<any>{

  constructor(private authentication:AuthenticationService) { }
  resolve(){
    console.log(this.authentication.getCurrentUser());
    return this.authentication.getCurrentUser();
  }
}
