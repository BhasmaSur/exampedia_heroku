import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { EncryptDecryptService } from './encrypt-decrypt.service';
@Injectable({
  providedIn: 'root'
})
export class CookieHandlerService {

  constructor(private cookieService:CookieService,private encDec:EncryptDecryptService) { }
  setCookie(key:any,value:any){
    let encryptedValue=this.encDec.encryptData(value,"cookie-value");
    this.cookieService.set(key,encryptedValue);
  }
  getCookie(key:any){
    let encryptedValue=this.cookieService.get(key);
    let decryptedValue=this.encDec.decryptData(encryptedValue,"cookie-value");
    return decryptedValue;
  }
  clearALlCookie(){
    this.cookieService.deleteAll();
  }
 
  
}
