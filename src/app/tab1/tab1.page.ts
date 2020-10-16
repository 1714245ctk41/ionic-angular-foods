import { Component } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";
import { firestore } from "firebase";
import { CrudProductService } from "../services/crud-database";
import {Product} from "../models/product.model";
import { CrudStorageService } from '../services/crud-storage.service';

// const { Storage } = Plugins;

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  product = {} as Product;
  products = [];
    public productCart: Array<Product> = [];

 
  // productvalue = {

  // price: '62314532',
  // name: 'food10',
  // tutorial: '“Là điểm nhấn đặc biệt của ẩm thực Pháp nói riêng và ẩm thực phương Tây nói chung, Roux có mặt trong hầu hết các món ăn ở vùng đất này để tạo nên hương vị đặc trưng, độc đáo. Không chỉ dừng lại ở đó, suốt nhiều thập kỷ qua, Roux còn “vươn mình” ra khỏi quê hương và chinh phục rất nhiều thực khách khó tính từ khắp nơi trên thế giới. Vậy để biết Roux là gì và có công dụng ra sao khi dùng với món Âu, chúng ta hãy cùng tìm hiểu ngay trong bài viết sau đây nhé!',
  // category: 'món khô',
  // image: 'd318d3067782c84ddf80652c7daad067.jpg',
  // }

  constructor(private authentication: AuthenticationService, private productService: CrudProductService, public storage: CrudStorageService) {
    
    
    //  this.productService.getUser('products').then(ref => {ref.docs.forEach(value => this.products.push(value.data()))});
      //  console.log(this.products);
      //  this.productService.addProductValue(this.productvalue, 'products');
      
      
    }
   

  //    public async saveHistory(product) {
  //   let key = await this.storage.generateKey('proHistory');
  //   let productstorage = {
  //     id: key,
  //     price: product.price,
  // name: product.name,
  // tutorial: product.tutorial,
  // category: product.category,
  // image: product.image,
  //   };
  //   await this.storage.create(key, productstorage);
  //   // this.productCart = await this.storage.read('productHistory');


  // }


  //    public async saveCart(product) {
  //   let key = await this.storage.generateKey('product');
  //   let productstorage = {
  //     id: key,
  //     price: product.price,
  // name: product.name,
  // tutorial: product.tutorial,
  // category: product.category,
  // image: product.image,
  //   };
  //   await this.storage.create(key, productstorage);
  //   this.productCart = await this.storage.read('product');

  //   console.log(this.productCart)

  // }




}
