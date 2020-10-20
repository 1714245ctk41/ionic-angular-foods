import { Component, OnInit } from '@angular/core';
import { CrudStorageService } from '../../services/crud-storage.service';
import { AlertController, NavController, ToastController } from "@ionic/angular";
import { Product } from '../../models/product.model';
import { User } from '../../models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
    public productCart: Array<Product> = [];
    public userSave = {};
   public user =  {} as User;

  public total_string :string;
  public total = 0;

  constructor
  (
    public storage: CrudStorageService, 
    public alertController: AlertController,
   public toastController: ToastController,
    private navCtrl: NavController,

    ) { }

  async ngOnInit() {
    this.productCart = await this.storage.read('productcart');
   

   (await this.storage.readUser('person')).forEach(value=>{
        this.user = value;
        console.log(value)
   });

    this.total = ( this.productCart.reduce(function(a, b) {
        return a + b.soluongcart*b.price;
      }, 0));
    //  this.total_string =  this.numberFormat.format(this.total)
    console.log(this.productCart)


  }

  async thanhtoan(){
    if(this.total <= 0){
 const toast = await this.toastController.create({
      message: 'Giỏ hàng đang trống.',
      duration: 2000
    });
toast.present();
    }else{
         
         this.user['totalcart'] = this.numberFormat.format(this.total);
        //  alert(this.user.totalcart)
        //  this.storage.delete('person')
        //  this.storage.createUser('person', this.user)
        await this.storage.updateUser(this.user, "person")
          
    // location.reload()
    location.href = "/thanhtoan"
      // console.log(this.user)
          // this.navCtrl.navigateRoot("/thanhtoan");
    }


  }

 
  tangsoluong(productid){
    let productupdate = this.productCart.find(element => element.productid == productid)
    productupdate.soluongcart++;
    this.storage.update(productupdate, productupdate.productid)
    this.total =  this.productCart.reduce(function(a, b) {
        return a + b.soluongcart*b.price;
      }, 0);
    
  }


   deleteCartproduct(cartid) {
      let productupdate = this.productCart.find(element => element.productid == cartid)
    productupdate.soluongcart--;
    this.storage.update(productupdate, productupdate.productid)
    this.total =  this.productCart.reduce(function(a, b) {
        return a + b.soluongcart*b.price;
      }, 0);
    if(productupdate.soluongcart < 1){
      document.getElementById(productupdate.productid).style.display= "none"
      this.storage.delete(cartid);
    
    }
    // console.log(productupdate)

    // alert("da");
    // window.location.href = "/dashboard";
  }

   numberFormat = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});


  

}
