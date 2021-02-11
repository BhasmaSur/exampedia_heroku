import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {

  userArray:any={};
  isUserAlreadyRegistered=false;
     //================== Form Variables ====================================================
     form: FormGroup=new FormGroup({
      userName:new FormControl(null,Validators.required),
      userEmail:new FormControl(null,Validators.required),
      userPassword:new FormControl(null,Validators.required),
      userConfirmPassword:new FormControl(null,Validators.required),
    })
    //================== XXXXXXX ===========================================================
  constructor(private router:Router,
    private autherService:AuthServiceService) { }

    ngOnInit(): void {
    }
    goToUserLoginPage(){
      this.router.navigate(['login']);
    }
    validateUser(){
      if(this.validateUserInput()){
        this.createUserArray();
        this.autherService.signUpUser(this.userArray).subscribe((userDetail:any)=>{
          if(userDetail){
            if(userDetail['errorCode'] == 200){
              this.isUserAlreadyRegistered=false;
              console.log("coaching details",userDetail);
              this.router.navigate(['login']);
            }
            else{
              console.log("message : "+userDetail!.errorMessage);
              this.isUserAlreadyRegistered=true;
            }
          }
  
        })
      }
    }
    validateUserInput(){
      return true;
    }
    createUserArray(){
      let userArray={
        name:this.form.controls['userName'].value,
        email:this.form.controls['userEmail'].value,
        password:this.form.controls['userPassword'].value,
      }
      this.userArray=userArray;
    }

}
