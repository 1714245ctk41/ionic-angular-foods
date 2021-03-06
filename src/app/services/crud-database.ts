import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from "@angular/fire/database";
import { User } from "../models/user.model";
import * as firebase from 'firebase/app';
import { FirebaseApp } from "@angular/fire";
import { AngularFirestore } from "@angular/fire/firestore";
import { CrudStorageService}from './crud-storage.service';
@Injectable({
  providedIn: "root",
})
export class CrudProductService {
  productListRef: AngularFireList<any>;
  productRef: AngularFireObject<any>;
    user = {} as User;
    currentUser=null;


  constructor(private db: AngularFireDatabase,private firestore:AngularFirestore,
    private storage:CrudStorageService) {}

  addUser( user, id: string, searchvalue) {
    this.firestore.collection(searchvalue).doc(id).ref.get().then(async(doc)=>{
      if(!doc.exists){
        await this.firestore.collection(searchvalue).doc(id).set(user);
        console.log("success");
        this.currentUser=user;
      }
      else{
      this.currentUser=doc.data();
      }
      console.log("failure");
      this.storage.createUser('person',this.currentUser);
    })
  }
  addProductValue(product, searchvalue) {
  return firebase.firestore().collection(searchvalue).add(product);
  
}
  addCollectioninDocs(value, collection_1, doc, collection_2){
    return firebase.firestore().
    collection(collection_1).
    doc(doc).collection(collection_2).add(value)

  }

  getUser(searchvalue: string) {
    return firebase.firestore().collection(searchvalue).get();
  }

  updateUser(user:User, searchUpdate) {
    return firebase.firestore().collection(searchUpdate).doc(user.userid).set(user, {merge: true});
  }

}
