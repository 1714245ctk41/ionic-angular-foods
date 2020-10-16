import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../services/authentication.service";
import { firestore } from "firebase";
import { CrudProductService } from "../../services/crud-database";
import {Product} from "../../models/product.model";
import { CrudStorageService } from '../../services/crud-storage.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    product = {} as Product;
  products = [];
    public productCart: Array<Product> = [];

  constructor(
    private authentication: AuthenticationService, 
    private productService: CrudProductService, 
    public storage: CrudStorageService,
    public toastController: ToastController
  ) {  this.productService.getUser('products').then(ref => {ref.docs.forEach(
    value =>{

      let productintinitial = {
        id: value.id,
  price: value.data().price,
  name: value.data().name,
  tutorial: value.data().tutorial,
  category: value.data().category,
  image: value.data().image,
  soluongcart: 1
      }

     this.products.push(productintinitial)
    //  console.log(productintinitial)
     }
    )});
      //  console.log(this.products);
      //  this.productService.addProductValue(this.productvalue, 'products');
      
      
    }
     async ngOnInit() {
      let person =  await this.storage.read('person')
    console.log(person );

  }
   

     public async saveHistory(product) {
       
    // let key = await this.storage.generateKey('proHistory');

    this.productCart = await this.storage.read('proHistory');
    let productCart_find = this.productCart.find(element => {
      return element.name == product.name
    })
    if(productCart_find){
    // this.storage.update(productCart_find)

    }else{
//  let key = await this.storage.generateKey('proHistory');
 let key = 'proHistory' + product.id;

    let productstorage = {
      id: key,
      price: product.price,
  name: product.name,
  tutorial: product.tutorial,
  category: product.category,
  image: product.image,
  soluongcart: 1,
  
    };
    await this.storage.create(key, productstorage);
    }
    // this.productCart = await this.storage.read('productHistory');


  }


     public async saveCart(product) {
       const toast = await this.toastController.create({
      message: 'Đã thêm vào giỏ hàng.',
      duration: 2000
    });
toast.present();
    this.productCart = await this.storage.read('productcart');
    let productCart_find = this.productCart.find(element => {
      return element.name == product.name
    })
    if(productCart_find){
      productCart_find.soluongcart++;
    this.storage.update(productCart_find)

    }else{
//  let key = await this.storage.generateKey('productcart');
 let key = 'productcart' + product.id;
    let productstorage = {
      id: key,
      price: product.price,
  name: product.name,
  tutorial: product.tutorial,
  category: product.category,
  image: product.image,
  soluongcart: 1
    };
    await this.storage.create(key, productstorage);
    }
  }




}
