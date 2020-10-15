import { Component } from '@angular/core';
import { Product } from '../models/product.model';
import { CrudStorageService } from '../services/crud-storage.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page  {


  constructor(public storage: CrudStorageService) {

  
  }

  async ngOnInint(){
   

    }


}
