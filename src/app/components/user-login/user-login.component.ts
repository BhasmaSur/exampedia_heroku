import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationsFile } from 'src/app/config/configurations';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { CookieHandlerService } from 'src/app/services/cookie-handler.service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  userDetails={
    username:"",
    password:""
  }
  constructor(private router:Router,
    private authService:AuthServiceService,
    private encDec:EncryptDecryptService,
    private cookieService:CookieHandlerService,
    private storageService: StorageServiceService
    ) { }

  ngOnInit(): void {
  }
  validateUser(){
    //console.log(this.userDetails);
    if(this.validateUserInput()){
      this.authService.getJWTToken(this.userDetails).subscribe(token=>{
        if(token){
          //console.log(token.jwt);
          this.cookieService.clearALlCookie();
          this.cookieService.setCookie("jwt",token);
          this.authService.getUserDetails().subscribe(userDetails=>{
            if(userDetails){
              console.log(userDetails);
              this.storageService.store(ConfigurationsFile.LOGGED_IN_USER,userDetails).then(res=>{
                this.authService.getUserLoggedInFromStorage();
                this.router.navigate(['']);
              })

            }
          })
        }
      })
    }
    else{
      console.log("field data is not correct");
    }
  
    
    //this.router.navigate(['']);
  }
  validateUserInput(){
    return true;
  }
  goToUserSignUpPage(){
    this.router.navigate(['signup']);
  }
}
