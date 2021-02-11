import { Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  constructor() { }

  async store(storageKey:string,value:any){
    const encryptedValue = btoa(escape(JSON.stringify(value)));
    await localStorage.setItem(
      storageKey,
      encryptedValue
    );
    return true;
  }
  async get(storageKey: string){
    const ret=await localStorage.getItem(storageKey);
    if(ret){
      return JSON.parse(unescape(atob(ret)));
    }
    else{
      return false;
    }
  }
  async removeItem(storageKey: string){
    await localStorage.removeItem(storageKey);
  }
  async clear(){
    await localStorage.clear();
  }
  /*
  async store(storageKey:string, value:any){
    const encryptedValue = btoa(escape(JSON.stringify(value)));
    await Storage.set({
      key:storageKey,
      value:encryptedValue
    });
  }
  async get(storageKey: string){
    localStorage.setItem
    const ret=await Storage.get({key:storageKey});
    if(ret.value){
      return JSON.parse(unescape(atob(ret.value)));
    }
    else{
      return false;
    }
  }
  async removeItem(storageKey: string){
    await Storage.remove({key: storageKey});
  }
  async clear(){
    await Storage.clear();
  }*/
}