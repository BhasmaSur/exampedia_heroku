import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigurationsFile } from '../config/configurations';
import { StorageServiceService } from '../services/storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class CoachingProfileGuardGuard implements CanActivate {
  constructor(private router:Router,
    private storageService:StorageServiceService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise(resolve=>{
      this.storageService.get(ConfigurationsFile.COACHING_ADMIN_LOGGED_IN).then(coaching=>{
        if(coaching){
          resolve(true);
        }
        else{
          this.router.navigate(['coaching-login']);
          resolve(false);
        }
      })
    })
  }
  
}
