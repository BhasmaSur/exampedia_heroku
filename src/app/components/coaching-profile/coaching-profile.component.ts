import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ConfigurationsFile } from 'src/app/config/configurations';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';
@Component({
  selector: 'app-coaching-profile',
  templateUrl: './coaching-profile.component.html',
  styleUrls: ['./coaching-profile.component.css']
})
export class CoachingProfileComponent implements OnInit {
  //=============== caraousle variables=================================

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }
  //=======================================XXX==================================
  //=============================== Login Variables ===========================
  isLoading: boolean = true;
  boolUserLoggedIn = false;
  //=============================  XXX  ======================================
  //============================= coaching variables ============================
  coachingDataToDisplay: any = [];
  numberOfExams = "0";
  numberOfCourses = "0";
  numberOfSubscribers = "0";
  strStars = "0/5";
  coachingId: any = "";
  userLoggedInRole = "USER";
  //============================= XXXX ===========================================
  //================================ courses ===================================
  courseSelected: any = "";
  examsToDisplay: any = []
  videosToDisplay = []
  pdfsToDisplay = []
  indexOfCourseSelected = 0;
  boolCourseNotAvaialable: boolean = false;
  emptyCourse: any = {
    courseName: "No Course Added"
  };
  subscribeToCourse() {
    console.log("working");
    alert("request to subscribe is sent to the coaching admin");
  }
  selectCourseClicked(index: any) {
    this.courseSelected = this.coachingDataToDisplay.coachingCourses[index].courseName;
    this.indexOfCourseSelected = index;
    this.initialiseItemsToDisplay(index);
  }
  //=========================== User ===========================================
  strLoggedInUser: any = "LOGIN";
  //================= XXXXXXXXX ===============================================
  //============================ XXXXXXXXXXXXX =================================
  constructor(private router: Router,
    private authService: AuthServiceService,
    private route: ActivatedRoute,
    private storageService: StorageServiceService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.coachingId = id;
    //console.log(id);
    this.authService.getUserLoggedInFromStorage().then(userDetails => {
      if (userDetails) {
        console.log("user logged in :",userDetails);
        this.strLoggedInUser = userDetails.userName;
        this.boolUserLoggedIn = true;
        this.userLoggedInRole = userDetails.roles;
      }
    })
    this.authService.allCoachingsData$.subscribe(coachings => {
      if (coachings) {
        for (let iCoaching = 0; iCoaching < coachings.length; iCoaching++) {
          if (coachings[iCoaching].coachingId == id) {
            this.coachingDataToDisplay = coachings[iCoaching];
            console.log(iCoaching,this.coachingDataToDisplay);
            this.initialiseCoachingVaribales();
            this.initialiseCoachingDp();
            this.isLoading = false;
          }
        }
      }
    })
  }
  displayPicUrl = "../../../assets/images/success_bg.png";
  selectedFile!: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  imageName: any;
  message: any = ""
  initialiseCoachingDp() {
    if (this.coachingDataToDisplay.coachingPicType == "NaN") {
      this.displayPicUrl = "../../../assets/images/success_bg.png";
    }
    else {
      this.base64Data = this.coachingDataToDisplay.coachingPicByte;
      this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      this.displayPicUrl = this.retrievedImage;
      console.log(this.displayPicUrl);
    }
  }
  initialiseCoachingVaribales() {
    this.initialiseCounts();
    if (this.coachingDataToDisplay.coachingCourses.length == 0) {
      console.log("course is empty");
      this.boolCourseNotAvaialable = true;
      this.courseSelected = "NO Course Selected";
    }
    else {
      this.courseSelected = this.coachingDataToDisplay.coachingCourses[0].courseName;
    }
    this.initialiseItemsToDisplay(0);
  }
  initialiseItemsToDisplay(index: any) {
    if (this.coachingDataToDisplay.coachingCourses.length > 0) {
      if (this.coachingDataToDisplay.coachingCourses[index].courseVideos.length > 0) {
        this.videosToDisplay = this.coachingDataToDisplay.coachingCourses[index].courseVideos;
      }
      else {
        this.videosToDisplay = [];
      }
      if (this.coachingDataToDisplay.coachingCourses[index].courseExams.length > 0) {
        this.examsToDisplay = this.coachingDataToDisplay.coachingCourses[index].courseExams;
      }
      else {
        this.examsToDisplay = [];
      }
      if (this.coachingDataToDisplay.coachingCourses[index].coursePdfs.length) {
        this.pdfsToDisplay = this.coachingDataToDisplay.coachingCourses[index].coursePdfs;
      }
      else {
        this.pdfsToDisplay = [];
      }
    }
  }
  initialiseCounts() {
    let examCount = 0;
    for (let iCourse = 0; iCourse < this.coachingDataToDisplay.coachingCourses.length; iCourse++) {
      examCount = examCount + this.coachingDataToDisplay.coachingCourses[iCourse].courseExams.length;
    }
    this.numberOfExams = examCount.toString();
    this.numberOfCourses = (this.coachingDataToDisplay.coachingCourses.length).toString();
    if (this.coachingDataToDisplay.coachingStars == "NaN") {
      this.strStars = "No ratings";
    }

  }
  //=============================== Login ==========================================
  openLoginProfile() {
    if (this.boolUserLoggedIn) {
      this.router.navigate(['profile']);
    }
    else {
      this.router.navigate(['login']);
    }

  }
  //================================ XXXX ==========================================
  //=============================== videos ========================================
  navigateToVideoGallery(id: any) {
    this.storageService.store(ConfigurationsFile.COURSE_VIDEO_IN_GALLERY, this.videosToDisplay).then(res => {
      if (res) {
        this.router.navigate(['video-gallery', { videoIndex: id }]);
      }
    })
  }
  //============================= XXXXXX ==========================================
  //================================= pdfs =========================================
  navigateToPdfGallery(id: any) {
    console.log(this.pdfsToDisplay);
    this.storageService.store(ConfigurationsFile.COURSE_PDFS_IN_GALLERY, this.pdfsToDisplay).then(res => {
      if (res) {
        this.router.navigate(['pdf-gallery', { pdfIndex: id }]);
      }
    })
  }
  //========================== XXXX ================================================
  //============================= Exams ===========================================
  navigateToExamsGallery(id: any) {
    this.storageService.store(ConfigurationsFile.COURSE_EXAM_IN_GALLERY, this.examsToDisplay).then(res => {
      if (res) {
        this.router.navigate(['exam-welcome', { examIndex: id }]);
      }
    })
  }
  //=============== XXXX ===========================================================
}
