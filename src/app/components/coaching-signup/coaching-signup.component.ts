import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-coaching-signup',
  templateUrl: './coaching-signup.component.html',
  styleUrls: ['./coaching-signup.component.css']
})
export class CoachingSignupComponent implements OnInit {

  coachingArray:any={};
     //================== Form Variables ====================================================
     form: FormGroup=new FormGroup({
      coachingName:new FormControl(null,Validators.required),
      coachingOwner:new FormControl(null,Validators.required),
      coachingEmail:new FormControl(null,Validators.required),
      coachingPassword:new FormControl(null,Validators.required),
      coachingConfirmPassword:new FormControl(null,Validators.required),
    })
    //================== XXXXXXX ===========================================================
  constructor(private router:Router,
    private autherService:AuthServiceService) { }

  ngOnInit(): void {
  }
  goToCoachingLoginPage(){
    this.router.navigate(['coaching-login']);
  }
  validateUser(){
    if(this.validateCoachingInput()){
      this.createCoachingArray();
      this.autherService.signUpCoaching(this.coachingArray).subscribe(coachingDetail=>{
        if(coachingDetail){
          console.log("coaching details",coachingDetail);
          this.router.navigate(['coaching-login']);
        }
      })
    }
  }
  validateCoachingInput(){
    return true;
  }
  createCoachingArray(){
    let coachingArray={
      name:this.form.controls['coachingName'].value,
      email:this.form.controls['coachingEmail'].value,
      password:this.form.controls['coachingPassword'].value,
      mobile:"NaN",
      address:"NaN",
      owner:this.form.controls['coachingOwner'].value,
    }
    console.log("coaching details",coachingArray);
    this.coachingArray=coachingArray;
  }
}
