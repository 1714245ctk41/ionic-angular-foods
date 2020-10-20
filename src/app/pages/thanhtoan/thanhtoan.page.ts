import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { CrudStorageService } from '../../services/crud-storage.service';
import {CrudProductService} from '../../services/crud-database';
import { NavController, ToastController } from '@ionic/angular';
import { Observable, interval, Subscription } from 'rxjs';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-thanhtoan',
  templateUrl: './thanhtoan.page.html',
  styleUrls: ['./thanhtoan.page.scss'],
})
export class ThanhtoanPage implements OnInit {
   private updateSubscription: Subscription;
  public thanhtoan = {} as User;
  public productCart: Array<Product> = [];
  



  constructor(
    public storage: CrudStorageService,
    private crudProductService: CrudProductService,
    private toastController: ToastController,
    private navCtrl: NavController,

  ) { 
    

  }

  async ngOnInit() {
    this.productCart = await this.storage.read('productcart');
  
     

      (await this.storage.readUser('person')).forEach(value=>{
        this.thanhtoan=value

      });
      console.log(this.thanhtoan)
    //  this.crudProductService.getUser("hoa_don").then(value =>
    //    value.docs.forEach(value => {
    //      console.log(value.id)
    //    })
    //  )
   
  }

  async logForm(){


    if(this.thanhtoan.totalcart === '0'){
      const toast = await this.toastController.create({
        message: 'Giỏ hàng đang trống.',
        duration: 2000
      });
  toast.present();


    }else{
      const toast = await this.toastController.create({
        message: 'Đã đặt hàng thành công.',
        duration: 2000
      });
  toast.present();
      
      this.crudProductService.addProductValue(this.thanhtoan, "hoa_don").then(value => {
        this.productCart.forEach(item => {
        value.collection('products').add(item)

        })

       
      })
    

      // "hoa_don", this.thanhtoan.id, "products"
      this.storage.updateUser(this.thanhtoan, 'person');
  
      this.thanhtoan['totalcart'] = '0';
  
      this.storage.deleteAllCart('productcart');
    }
   

            // this.navCtrl.navigateRoot("/thanhtoan");

  }

}
