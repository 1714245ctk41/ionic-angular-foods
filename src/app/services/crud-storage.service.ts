import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class CrudStorageService {
    public users: Array<Product> = [];


  constructor(public storage: Storage) { 
   
   }

    public async generateKey(namestorage: string): Promise<string> {
    let key = `${namestorage}${parseInt(`${Math.random() * 100}`)}`;
    let ret = await this.storage.get(key);

    while (ret) {
      key = `${namestorage}${parseInt(`${Math.random() * 100}`)}`;
      ret = await this.storage.get(key);
    }
    return key;
  }
    public async read(valueforget): Promise<Product[]> {
    let users: Array<Product> = [];
    await this.storage.forEach((v, key, i) => {
      if (key.startsWith(valueforget)) {
        users.push(v);
      }
    });
    return users;
  }

  public async create(key: string, user: Product) {
    
    return await this.storage.set(key, user);
  }

  public async update(product: Product) {
    return await this.storage.set(product.id, product);
  }

  public async delete(key: string) {
    return await this.storage.remove(key);
  }
  async clear() {
    await this.storage.clear();
  }
}
