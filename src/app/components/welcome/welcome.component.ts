import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ConfigurationsFile } from 'src/app/config/configurations';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  //=================== Loader variable ==================================
  isLoading = true;
  // ================= XXXXXXXX ==========================================
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

  //=======================Logging in variables==================================
  strLoggedInUser = "Login";
  boolUserLoggedIn = false;
  //=============================XXXXXXXXXXX==================================

  //============================ COACHING VARIABLES ========================
  courseList: any = [];
  examList: any = [];
  videoList: any = [];
  pdfList: any = [];
  boolShowCourses = false;
  listOfCoursesToDisplay: any;
  listOfExamsToDisplay: any;
  listOfSubjectsToDisplay: any;
  filteredCourses: any = [];
  filteredExams: any = [];
  filteredSubjects: any = [];
  coachingsToDisplayArray: any;
  coachingsToRemoveFilterArray: any;
  boolShowExams = false;
  boolShowSubjects = false;
  boolShowFilterInMenu = false;
  allCoachingArray: any;
  listOfCourses: any;
  //=============================== demo data ===============================

  //=========================================== XXXXXXX ======================
  //================================= INBUILT FUNCTIONS =====================
  constructor(private viewPortScroller: ViewportScroller,
    private router: Router,
    private authService: AuthServiceService,
    private storageService: StorageServiceService,
    private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.authService.allCoachingsData$.subscribe(coachings => {
      if (coachings) {
        //console.log(coachings);
        this.allCoachingArray = coachings;
        this.coachingsToDisplayArray = coachings;
        this.isLoading = false;
        this.initialiseStorageVariables();
      }
    })
    this.authService.getUserLoggedInFromStorage().then(userDetails => {
      if (userDetails) {
        //console.log("user present", userDetails);
        this.strLoggedInUser = userDetails.userName;
        this.boolUserLoggedIn = true
      }
    });
  }
  initialiseStorageVariables() {
    this.authService.listOfCoursesData$.subscribe(course => {
      if (course) {
        this.courseList = course;
      }
    })
    this.authService.listOfExamsData$.subscribe(exam => {
      if (exam) {
        this.examList = exam;
      }
    })
    this.authService.listOfVideosData$.subscribe(video => {
      if (video) {
        this.videoList = video;
      }
    })
    this.authService.listOfPdfsData$.subscribe(pdf => {
      if (pdf) {
        this.pdfList = pdf;
        //console.log(this.pdfList);
      }
    })

  }
  ngOnChanges() {
    this.coachingsToDisplayArray = this.allCoachingArray;
    this.listOfCoursesToDisplay = this.courseList;
    this.listOfExamsToDisplay=this.examList;
  }
  //================================= XXXX ===================================

  //================================ common functions =============================
  initialiseDefaultvariables() {
    this.strLoggedInUser = "Login";
    this.boolUserLoggedIn = false;
  }
  navigateToCoachingSelected(event: any) {
    //console.log(event);
    this.router.navigate(['coaching/' + event]);
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    //event.target.innerWidth;
    let widthOfScreen = event.target.innerWidth;
    if (widthOfScreen < 768) {
      this.boolShowFilterInMenu = true;
    }
    else {
      this.boolShowFilterInMenu = false;
    }

  }
  goToDivView(home: any, coachings: any, contact: any, event: any) {
    if (event == "home") {
      home.scrollIntoView();
    }
    else if (event == "coachings") {
      coachings.scrollIntoView();
    }
    else if (event == "contact") {
      contact.scrollIntoView();
    }
  }
  removeSearchList(){
    //console.log("its working");
    this.boolShowCourses=false;
    this.boolShowExams=false;
  }
  //=============================== Coaching Courses ===========================
  showListOfCourses() {
    this.getListOfCourses();
    this.boolShowCourses = true;
  }
  addToFilteredCourseList(varCourse: any) {
    this.boolShowCourses = false;
    if (varCourse != "NONE") {
      if (this.filteredCourses.includes(varCourse)) {
        console.log("already in the list");
      }
      else {
        this.filteredCourses.push(varCourse);
        this.filterCoachingsWhenCourseFilterApplied();
      }
    }
  }
  filterCoachingsWhenCourseFilterApplied() {
    this.coachingsToDisplayArray = this.allCoachingArray;
    for (let co of this.filteredCourses) {
      console.log(co);
      this.coachingsToDisplayArray = this.coachingsToDisplayArray.filter((item: any) => {
        return (this.filterCoursesAndReturnAssist(item, co));
      })
    }
    console.log(this.coachingsToDisplayArray);
  }
  filterCoursesAndReturnAssist(item: any, co: any) {
    for (let i = 0; i < item.coachingCourses.length; i++) {
      if (item.coachingCourses[i] == null) {
        console.log("Course in null ======", item.coachingCourses[i]);
        return false;
      }
      else {
        if (item.coachingCourses[i].courseName.toUpperCase().indexOf(co.toUpperCase()) > -1) {
          console.log("Course not in null :", item.coachingCourses[i]);
          return true;
        }
      }
      return false;
    }
    return false;
  }
  filterCoursesForInput(event: any) {
    this.getListOfCourses();
    const val = event.target.value;
    if (val && val.trim() != '') {
      this.listOfCoursesToDisplay = this.listOfCoursesToDisplay.filter((item: any) => {
        return (item.toUpperCase().indexOf(val.toUpperCase()) > -1);
      })
    }
  }
  getListOfCourses() {
    this.listOfCoursesToDisplay = this.courseList;
  }
  removeCourseTag(tagToRemove: any) {
    let indexOfTag = this.filteredCourses.indexOf(tagToRemove);
    this.filteredCourses.splice(indexOfTag, 1);
    this.filterCoachingsWhenCourseFilterApplied();
  }



  //================================ Coaching Exams =============================
  showListOfExams() {
    this.getListOfExams();
    this.boolShowExams = true;
  }
  getListOfExams() {
    this.listOfExamsToDisplay = this.examList;
  }
  filterExamsForInput(event: any) {
    this.getListOfExams();
    const val = event.target.value;
    if (val && val.trim() != '') {
      this.listOfExamsToDisplay = this.listOfExamsToDisplay.filter((item: any) => {
        return (item.toUpperCase().indexOf(val.toUpperCase()) > -1);
      })
    }
  }
  addToFilteredExamsList(varExam: any) {
    this.boolShowExams = false;
    if (varExam != "NONE") {
      if (this.filteredExams.includes(varExam)) {
        console.log("already in the list");
      }
      else {
        this.filteredExams.push(varExam);
        this.filterCoachingsWhenExamsFilterApplied();
      }
    }
  }
  filterCoachingsWhenExamsFilterApplied() {
    this.coachingsToDisplayArray = this.allCoachingArray;
    for (let ex of this.filteredExams) {
      console.log(ex);
      this.coachingsToDisplayArray = this.coachingsToDisplayArray.filter((item: any) => {
        return (this.filterExamsAndReturnAssist(item,ex));
      })
    }
    console.log(this.coachingsToDisplayArray);
  }
  filterExamsAndReturnAssist(item:any,ex:any){
    for(let iCourse=0; iCourse <item.coachingCourses.length;iCourse++){
      for(let iExam=0;iExam < item.coachingCourses[iCourse].courseExams.length;iExam++){
        if(item.coachingCourses[iCourse].courseExams[iExam]==null){
          return false;
        }
        else{
          if(item.coachingCourses[iCourse].courseExams[iExam].examName.toUpperCase().indexOf(ex.toUpperCase()) > -1){
            return true;
          }
        }
      }
      return false;
    }
    return false;
  }
  removeExamsTag(tagToRemove: any) {
    let indexOfTag = this.filteredExams.indexOf(tagToRemove);
    this.filteredExams.splice(indexOfTag, 1);
    this.filterCoachingsWhenExamsFilterApplied();
  }
  //=============================== XXXXX ==========================================
  //================================ Coaching Subjects =============================

  //=============================== XXXXX ==========================================
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
  //=============================== Coaching ======================================
  showCoachingPage(event:any){
    //console.log(event);
    this.router.navigate(['coaching/' + event]);
  }
  //============== XXXX ===========================================================
}
