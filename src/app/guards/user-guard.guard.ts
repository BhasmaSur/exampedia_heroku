import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigurationsFile } from '../config/configurations';
import { AuthServiceService } from '../services/auth-service.service';
import { StorageServiceService } from '../services/storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuardGuard implements CanActivate {
  constructor(private authService:AuthServiceService,
    private router:Router,
    private storageService:StorageServiceService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean>{
   return new Promise(resolve =>{
     this.storageService.get(ConfigurationsFile.LOGGED_IN_USER).then(user=>{
       if(user){
         resolve(true);
       }
       else{
         this.router.navigate(['login']);
         resolve(false);
       }
     })
   })
  }
  
}
