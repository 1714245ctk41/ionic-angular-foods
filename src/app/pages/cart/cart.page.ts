import { Component, OnInit } from '@angular/core';
import { CrudStorageService } from '../../services/crud-storage.service';
import { AlertController } from "@ionic/angular";
import { Product } from '../../models/product.model';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
    public productCart: Array<Product> = [];


  constructor(public storage: CrudStorageService, public alertController: AlertController) { }

  async ngOnInit() {
    this.productCart = await this.storage.read('product');
  }

 
    


   deleteCartproduct(cartid) {
    let deletefunction = () => {
      this.storage.delete(cartid);
    };
    this.presentAlertMultipleButtons(
      deletefunction,
      "Xóa sản phẩm",
      "Bạn có muốn xóa sản phẩm không."
    );

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
            funcadd(), (window.location.href = "/cart");
          },
        },
      ],
    });

    await alert.present();
  }

}
