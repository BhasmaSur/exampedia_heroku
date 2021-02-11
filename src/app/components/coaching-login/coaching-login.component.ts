import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ConfigurationsFile } from 'src/app/config/configurations';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { CookieHandlerService } from 'src/app/services/cookie-handler.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-coaching-login',
  templateUrl: './coaching-login.component.html',
  styleUrls: ['./coaching-login.component.css']
})
export class CoachingLoginComponent implements OnInit {
  coachingDetails={
    username:"",
    password:""
  }
  constructor(private authService:AuthServiceService,
    private cookieService:CookieHandlerService,
    private storageService:StorageServiceService,
    private router:Router) { }

  ngOnInit(): void {
  }
  validateUser(){
    if(this.validateUserInput()){
      this.authService.getJWTToken(this.coachingDetails).subscribe(token=>{
        if(token){
          //console.log(token.jwt);
          this.cookieService.clearALlCookie();
          this.cookieService.setCookie("jwt",token);
          this.authService.getUserDetails().subscribe(coachingUserDetails=>{
            if(coachingUserDetails){
              console.log("coaching user details ","coaching-login page ",coachingUserDetails);
              this.storageService.store(ConfigurationsFile.LOGGED_IN_USER,coachingUserDetails).then(res=>{
                if(res){
                  this.authService.getCoachingDetails().subscribe((coachingAdminData:any)=>{
                    if(coachingAdminData){
                      console.log("coaching returened from data base ","coaching-login page ",coachingAdminData);
                      this.storageService.store(ConfigurationsFile.COACHING_ADMIN_LOGGED_IN,coachingAdminData).then(resC=>{
                        if(resC){
                          this.authService.getUserLoggedInFromStorage();
                          this.router.navigate(['coaching-preview']);
                        }
                      })
                      
                    }
                  })
                 
                }
            
              })

            }
          })
        }
      })
    }
    else{
      console.log("field data is not correct");
    }
  }
  validateUserInput(){
    return true;
  }
  goToCoachingSignUpPage(){
    //console.log("its working")
    this.router.navigate(['coaching-signup']);
  }

}
