import { Component, OnInit } from '@angular/core';
import { CrudStorageService } from '../../services/crud-storage.service';
import { AlertController } from "@ionic/angular";
import { Product } from '../../models/product.model';
import { User } from '../../models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
    public productCart: Array<Product> = [];
    public userSave = {};
   public user =  {} as User;


  public total : number =0;

  constructor
  (public storage: CrudStorageService, 
    public alertController: AlertController,
   
    ) { }

  async ngOnInit() {
    this.productCart = await this.storage.read('productcart');

   (await this.storage.readUser('person')).forEach(value=>{
        this.user = value
   });

    this.total =  this.productCart.reduce(function(a, b) {
        return a + b.soluongcart*b.price;
      }, 0);


  }

  thanhtoan(){
  this.user['totalcart'] = this.total;
    this.storage.updateUser( this.user, 'person');

  }

 
  tangsoluong(productid){
    let productupdate = this.productCart.find(element => element.id == productid)
    productupdate.soluongcart++;
    this.storage.update(productupdate)
    this.total =  this.productCart.reduce(function(a, b) {
        return a + b.soluongcart*b.price;
      }, 0);
    
  }


   deleteCartproduct(cartid) {
      let productupdate = this.productCart.find(element => element.id == cartid)
    productupdate.soluongcart--;
    this.storage.update(productupdate)
    this.total =  this.productCart.reduce(function(a, b) {
        return a + b.soluongcart*b.price;
      }, 0);
    if(productupdate.soluongcart < 1){
      document.getElementById(productupdate.id).style.display= "none"
      this.storage.delete(cartid);
    
    }

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
