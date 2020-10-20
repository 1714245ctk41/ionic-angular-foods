import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Product } from '../../models/product.model';
import { User } from '../../models/user.model';
import { CrudProductService } from '../../services/crud-database';

import { CrudStorageService } from '../../services/crud-storage.service';


@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
    public productHistory: Array<Product> = [];
    public hoa_don: Array<User> = [];
    public personCurrent: User;
    public hoa_don_1: Array<User> = [];



  constructor(
    public storage: CrudStorageService, 
    public alertController: AlertController, 
    public toastController: ToastController,
    public crudProductService: CrudProductService
    ) { }

  async ngOnInit() {
    this.productHistory = await this.storage.read('proHistory');
    (await this.storage.readUser('person')).forEach(value=>{

      this.personCurrent = value;
    });
    // console.log(this.personCurrent.id)
    this.crudProductService.getUser('hoa_don').then(value => {
      value.docs.forEach(hoadon => {
       if(this.personCurrent.userid == hoadon.data().userid){
        let hoa_don_ter = {
          userid: hoadon.data().userid,
          email: hoadon.data().email,
          password: hoadon.data().password,
          name: hoadon.data().name,
          sdt: hoadon.data().sdt,
          address: hoadon.data().address,
          totalcart: hoadon.data().totalcart,   
             }
       this.hoa_don.push(hoa_don_ter)

       }
      })
    })
    console.log(this.hoa_don)

  }

      
  numberFormat = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });




  async deleteCartproduct(cartid) {
     const toast = await this.toastController.create({
      message: 'Đã xóa sản phẩm.',
      duration: 2000
    });
toast.present();
      this.storage.delete(cartid);
      document.getElementById(cartid).style.display= "none"

    // this.presentAlertMultipleButtons(
    //   deletefunction,
    //   "Xóa sản phẩm",
    //   "Bạn có muốn xóa sản phẩm không."
    // );

    // alert("da");
    // window.location.href = "/dashboard";
  }


   async presentAlertMultipleButtons(funcadd, subheader, message) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",

      subHeader: subheader,
      message: message,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
        },
        {
          text: "Okay",
          handler: (blah) => {
            funcadd()
            // , (window.location.href = "/history")
          },
        },
      ],
    });

    await alert.present();
  }

}
