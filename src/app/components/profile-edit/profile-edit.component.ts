import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  //======================== User details varibales ===============================
  @ViewChild('FileSelectInputDialog') FileSelectInputDialog!: ElementRef;
  displayPicUrl = "../../../assets/images/021.JPG";
  //========================= Loading screen variables =========================
  isLoading = true;
  //======================== User details varibales ===============================
  userDetailsToDisplay: any;
  examsSubscribedDetails: Array<any> = [];
  preferenceCourses: Array<any> = [];
  preferenceExams: Array<any> = [];
  boolCoursesNotSubscribed = false;
  boolExamsNotSubscribed = false;
  //=======================  XXXX  ================================================
  //======================= Common functions =====================================
  constructor(private router: Router,
    private authService: AuthServiceService,
    private httpService: HttpServiceService) { }

  ngOnInit(): void {
    this.authService.getUserLoggedInFromStorage().then(userDetails => {
      if (userDetails) {
        this.userDetailsToDisplay = userDetails;
        //console.log(this.userDetailsToDisplay);
        this.initialiseVariables();
      }
    })
  }
  initialiseVariables() {
    this.initialiseExamsSubscribed();
    this.initialisePreferences();
    this.initialiseListOfPreferences()
    this.initialiseDp();
    //console.log(this.examsSubscribedDetails);
  }
  initialiseDp() {
    if (this.userDetailsToDisplay.picType == "NaN") {
      console.log("1", this.userDetailsToDisplay.picType);
      this.displayPicUrl = "../../../assets/images/user.png"
    }
    else {
      
      this.base64Data = this.userDetailsToDisplay.picByte;
      this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      this.displayPicUrl = this.retrievedImage;
      console.log("2", this.displayPicUrl);
    }
  }
  initialiseListOfPreferences() {
    this.authService.listOfCoursesData$.subscribe(courses => {
      if (courses) {
        this.listCourses = courses;
        this.getListOfCourses();
        this.isLoading = false;
      }
    })
    this.authService.listOfExamsData$.subscribe(exams => {
      if (exams) {
        this.listExams = exams;
        this.isLoading = false;
      }
    })
  }
  initialiseExamsSubscribed() {
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
  initialisePreferences() {
    if (this.userDetailsToDisplay.preferenceCourses == "NaN") {
      this.preferenceCourses = [];
    }
    else {
      this.preferenceCourses = this.userDetailsToDisplay.preferenceCourses.split(",");
    }
    if (this.userDetailsToDisplay.preferenceExams == "NaN") {
      this.preferenceExams = [];
    }
    else {
      this.preferenceExams = this.userDetailsToDisplay.preferenceExams.split(",");
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
    this.authService.logoutUserLoggedIn("user")
  }
  //========================== XXXXX ==============================================
  //====================== Editing functions ====================================
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  imageName: any;
  message: any = ""

  saveAndGoToUserProfile() {
    this.updateAllTheValuesInVariable();
    // if (this.selectedFile) {
    //   const uploadImageData = new FormData();
    //   uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    //   console.log("profile-edit ",uploadImageData);
    //   this.authService.uploadUserDp(uploadImageData).subscribe(res => {
    //     if (res.status === 200) {
    //       console.log("profile-edit ",res.body);
    //       this.retrieveResonse = res.body;
    //       this.base64Data = this.retrieveResonse.picByte;
    //       this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
    //       this.displayPicUrl = this.retrievedImage;
    //       this.userDetailsToDisplay.picByte=this.retrieveResonse.picByte;
    //       this.userDetailsToDisplay.picType=this.retrieveResonse.picType;
    //       this.authService.storeUserDataIntoStorage(this.userDetailsToDisplay);
    //     }
    //   })
    // }
    this.authService.updateUserLoggedInToTheServer(this.userDetailsToDisplay).subscribe(updatedUser => {
      if (updatedUser) {
        console.log("updated user ","profile-edit ",updatedUser);
        if (this.selectedFile) {
          const uploadImageData = new FormData();
          uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
          console.log("profile-edit ",uploadImageData);
          this.authService.uploadUserDp(uploadImageData).subscribe(res => {
            if (res.status === 200) {
              console.log("profile-edit ",res.body);
              this.retrieveResonse = res.body;
              this.base64Data = this.retrieveResonse.picByte;
              this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
              this.displayPicUrl = this.retrievedImage;
              this.userDetailsToDisplay.picByte=this.retrieveResonse.picByte;
              this.userDetailsToDisplay.picType=this.retrieveResonse.picType;
              this.authService.storeUserDataIntoStorage(this.userDetailsToDisplay);
            }
          })
        }
        else{
          this.authService.storeUserDataIntoStorage(updatedUser);
        }
        this.router.navigate(['profile']);
      }
    })

  }
  public OpenAddFilesDialog() {
    const e: HTMLElement = this.FileSelectInputDialog.nativeElement;
    e.click();
  }
  selectedFile!: File;

  changeDP(e: any) {
    console.log(e.target.files[0]);
    if (e.target.files && e.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event:any) => {
        this.displayPicUrl = event.target.result;
      }
    }
    else {
      console.log("object is null");
    }
    this.selectedFile = e.target.files[0];
  }
  updateAllTheValuesInVariable() {
    this.updatePreferencesToTheVariable();
    //console.log(this.userDetailsToDisplay);
  }
  updatePreferencesToTheVariable() {
    if (this.preferenceCourses.length == 0) {
      this.userDetailsToDisplay.preferenceCourses = "NaN";
    }
    else {
      this.userDetailsToDisplay.preferenceCourses = this.preferenceCourses.toString();
    }
    if (this.preferenceExams.length == 0) {
      this.userDetailsToDisplay.preferenceExams = "NaN";
    }
    else {
      this.userDetailsToDisplay.preferenceExams = this.preferenceExams.toString();
    }
  }
  // ====================== XXXX ======================
  //======================== removing tags ================
  removeExamTag(exam: any) {
    let index: number = this.preferenceExams.indexOf(exam, 0);
    if (index > -1) {
      this.preferenceExams.splice(index, 1)
    }
  }
  removeCourseTag(course: any) {
    let index: number = this.preferenceCourses.indexOf(course, 0);
    if (index > -1) {
      this.preferenceCourses.splice(index, 1)
    }
  }
  //================== XXXX ==============================
  //========================== Course preferences ================================
  listCourses: any = [];
  listOfCoursesToDislay: any = []
  boolShowCourseList = false
  filterCoursesForInput(event: any) {
    this.getListOfCourses();
    const val = event.target.value;
    if (val && val.trim() != '') {
      this.listOfCoursesToDislay = this.listOfCoursesToDislay.filter((item: any) => {
        return (item.toUpperCase().indexOf(val.toUpperCase()) > -1);
      })
    }
  }
  getListOfCourses() {
    this.listOfCoursesToDislay = this.listCourses;
  }
  addIntoPreferenceCourses(course: any) {
    if (!this.preferenceCourses.includes(course)) {
      this.preferenceCourses.push(course);
      this.boolShowCourseList = false;
    }
  }
  showListOfCourses() {
    this.listOfCoursesToDislay = this.listCourses;
    this.boolShowCourseList = true;
  }
  removeSearchList() {
    this.boolShowCourseList = false;
    this.boolShowExamList = false;
  }
  //==================== XXXXX =============================================
  //====================== Exams preferences ==============================
  listExams: any = [];
  listOfExamsToDislay: any = [];
  boolShowExamList = false;
  filterExamsForInput(event: any) {
    this.getListOfExams();
    const val = event.target.value;
    if (val && val.trim() != '') {
      this.listOfExamsToDislay = this.listOfExamsToDislay.filter((item: any) => {
        return (item.toUpperCase().indexOf(val.toUpperCase()) > -1);
      })
    }
  }
  getListOfExams() {
    this.listOfExamsToDislay = this.listExams;
  }
  addIntoPreferenceExams(exam: any) {
    if (!this.preferenceExams.includes(exam)) {
      this.preferenceExams.push(exam);
      this.boolShowExamList = false;
    }
  }
  showListOfExams() {
    this.listOfExamsToDislay = this.listExams;
    this.boolShowExamList = true;
  }
  //==================== XXXXXXXXX =========================================
}
