import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../services/authentication.service";
import { firestore } from "firebase";
import { CrudProductService } from "../../services/crud-database";
import {Product} from "../../models/product.model";
import { CrudStorageService } from '../../services/crud-storage.service';

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
    private authentication: AuthenticationService, private productService: CrudProductService, public storage: CrudStorageService
  ) {  this.productService.getUser('products').then(ref => {ref.docs.forEach(value => this.products.push(value.data()))});
      //  console.log(this.products);
      //  this.productService.addProductValue(this.productvalue, 'products');
      
      
    }
      ngOnInit() {
  }
   

     public async saveHistory(product) {
    let key = await this.storage.generateKey('proHistory');
    let productstorage = {
      id: key,
      price: product.price,
  name: product.name,
  tutorial: product.tutorial,
  category: product.category,
  image: product.image,
    };
    await this.storage.create(key, productstorage);
    // this.productCart = await this.storage.read('productHistory');


  }


     public async saveCart(product) {
    let key = await this.storage.generateKey('product');
    let productstorage = {
      id: key,
      price: product.price,
  name: product.name,
  tutorial: product.tutorial,
  category: product.category,
  image: product.image,
    };
    await this.storage.create(key, productstorage);
    this.productCart = await this.storage.read('product');

    console.log(this.productCart)

  }




}
