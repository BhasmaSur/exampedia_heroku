import { Component, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  //========================= Loading screen variables =========================
  isLoading = true;
  //======================== User details varibales ===============================
  userDetailsToDisplay: any;
  examsSubscribedDetails: Array<any> = [];
  preferenceCourses:Array<any> = [];
  preferenceExams:Array<any> = [];
  boolCoursesNotSubscribed = false;
  boolExamsNotSubscribed = false;
  boolExamsNotInPreference=false;
  boolCourseNotInPreference=false;
  displayPicUrl="";
  //=======================  XXXX  ================================================
  //======================= Preference variables ================================
  listCourses:any=[];
  listExams:any=[];
  //=================== XXXXXXXXXXX ==============================================
  //======================= Common functions =====================================
  constructor(private router: Router,
    private authService: AuthServiceService) { }

  ngOnInit(): void {
    
    this.authService.loggedInUserData$.subscribe(userDetails=>{
      if(userDetails){
        this.userDetailsToDisplay = userDetails;
        console.log(this.userDetailsToDisplay);
        this.initialiseVariables();
        this.isLoading = false;
      }
    })
  }
  initialiseVariables() {
    this.initialiseExamsSubscribed();
    this.initialisePreferences();
    this.initialiseListOfItems();
    this.initialiseDp();

    //console.log(this.examsSubscribedDetails);
  }
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  initialiseDp() {
    if (this.userDetailsToDisplay.picType == "NaN") {
      console.log("1", this.userDetailsToDisplay.picType);
      this.displayPicUrl = "../../../assets/images/user.png"
    }
    else {
      
      this.base64Data = this.userDetailsToDisplay.picByte;
      this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      this.displayPicUrl = this.retrievedImage;
      // console.log("2", this.displayPicUrl);
    }
  }

  initialiseListOfItems(){
    this.authService.listOfCoursesData$.subscribe(courses=>{
      if(courses){
        this.listCourses=courses;
      }
    })
    this.authService.listOfExamsData$.subscribe(exams=>{
      if(exams){
        this.listExams=exams;
      }
    })
  }
  initialiseExamsSubscribed() {
    if(this.userDetailsToDisplay.coursesSubscribed != null){
      for (let i = 0; i < this.userDetailsToDisplay.coursesSubscribed.length; i++) {
        if (this.userDetailsToDisplay.coursesSubscribed.length > 0) {
          if (this.userDetailsToDisplay.coursesSubscribed[i].courseExams.length > 0) {
            for (let j = 0; j < this.userDetailsToDisplay.coursesSubscribed[i].courseExams.length; j++) {
              this.examsSubscribedDetails.push(this.userDetailsToDisplay.coursesSubscribed[i].courseExams[j]);
            }
          }
        }
      }
    }
    
  }
  initialisePreferences() {
    if(this.userDetailsToDisplay.preferenceCourses != null){
      if(this.userDetailsToDisplay.preferenceCourses != "NaN"){
        this.preferenceCourses=this.userDetailsToDisplay.preferenceCourses.split(",");
      }
      else{
        this.boolCourseNotInPreference=true;
      }
     
    }
    if(this.userDetailsToDisplay.preferenceExams != null){
      if(this.userDetailsToDisplay.preferenceExams != "NaN"){
        this.preferenceExams=this.userDetailsToDisplay.preferenceExams.split(",");
      }
      else{
        this.boolExamsNotInPreference=true;
      }
    }
  }
  //======================= XXXXXXXX ============================================
  //====================== Editing functions ====================================
  goToEditProfilePage() {
    this.router.navigate(['edit']);
  }
  // ====================== XXXX ==================================================
  //======================== Logout functions =====================================
  logoutUser() {
    this.authService.logoutUserLoggedIn("user");
  }
  //========================== XXXXX ==============================================
}
