import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { CrudStorageService } from 'src/app/services/crud-storage.service';
import {CrudProductService} from 'src/app/services/crud-database';
import { NavController, ToastController } from '@ionic/angular';
import { Observable, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-thanhtoan',
  templateUrl: './thanhtoan.page.html',
  styleUrls: ['./thanhtoan.page.scss'],
})
export class ThanhtoanPage implements OnInit {
   private updateSubscription: Subscription;
  public thanhtoan = {} as User;
  



  constructor(
    public storage: CrudStorageService,
    private crudProductService: CrudProductService,
    private toastController: ToastController,
    private navCtrl: NavController,

  ) { 
    

  }

  async ngOnInit() {
  
      

      (await this.storage.readUser('person')).forEach(value=>{
        this.thanhtoan=value
      });
   
  }

  async logForm(){
     const toast = await this.toastController.create({
      message: 'Đã đặt hàng thành công.',
      duration: 2000
    });
toast.present();
    
    this.crudProductService.addProductValue(this.thanhtoan, "hoa_don");
    this.thanhtoan['totalcart'] = '0';
    this.storage.updateUser(this.thanhtoan, 'person');


    this.storage.deleteAllCart('productcart');

            // this.navCtrl.navigateRoot("/thanhtoan");

  }

}
