import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Product } from '../../models/product.model';

import { CrudStorageService } from '../../services/crud-storage.service';


@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
    public productHistory: Array<Product> = [];


  constructor(public storage: CrudStorageService, 
    public alertController: AlertController, 
    public toastController: ToastController) { }

  async ngOnInit() {
    this.productHistory = await this.storage.read('proHistory');

  }




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
