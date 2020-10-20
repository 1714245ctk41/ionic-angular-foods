import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.model';
import { User } from '../../models/user.model';
import { CrudProductService } from '../../services/crud-database';


@Component({
  selector: 'app-history-order',
  templateUrl: './history-order.page.html',
  styleUrls: ['./history-order.page.scss'],
})
export class HistoryOrderPage implements OnInit {
  public hoadon_total : string;
  public hoadon_show :Array<User> = [];
  public product_buyed  = [];


  constructor(
    private activatedRoute: ActivatedRoute,
    public crudProductService: CrudProductService

  ) { }

  ngOnInit() {
    this.hoadon_total = this.activatedRoute.snapshot.paramMap.get("ordertotal");
    this.crudProductService.getUser('hoa_don').then(value => {
      
      value.docs.forEach(hoadon => {
       if(this.hoadon_total == hoadon.data().totalcart){
        let hoa_don_ter = {
          userid: hoadon.data().userid,
          email: hoadon.data().email,
          password: hoadon.data().password,
          name: hoadon.data().name,
          sdt: hoadon.data().sdt,
          address: hoadon.data().address,
          totalcart: hoadon.data().totalcart,        
        }
        this.hoadon_show.push(hoa_don_ter)
        // console.log(hoadon.id)
       this.crudProductService.getUser(`/hoa_don/${hoadon.id}/products`).then(value => {
         value.docs.forEach(item => {
           this.product_buyed.push(item.data())
         })
       })

       }
      })
    })
    console.log(this.product_buyed)

  }

  
  numberFormat = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

}
