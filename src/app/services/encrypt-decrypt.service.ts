import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class EncryptDecryptService {
  constructor() { }
  encryptData(data:any,password:any) {

    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data),password).toString();
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  decryptData(data:any,password:any) {

    try {
      const bytes = CryptoJS.AES.decrypt(data,password);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}
