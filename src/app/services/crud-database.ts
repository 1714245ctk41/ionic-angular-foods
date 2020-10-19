import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from "@angular/fire/database";
import { User } from "../models/user.model";
import * as firebase from 'firebase/app';
import { FirebaseApp } from "@angular/fire";

@Injectable({
  providedIn: "root",
})
export class CrudProductService {
  productListRef: AngularFireList<any>;
  productRef: AngularFireObject<any>;
    user = {} as User;


  constructor(private db: AngularFireDatabase) {}

  addUser( user, id: string, searchvalue) {
  return firebase.firestore().collection(searchvalue).doc(id).set(user);
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

}
