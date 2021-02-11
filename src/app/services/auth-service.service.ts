import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfigurationsFile } from '../config/configurations';
import { CookieHandlerService } from './cookie-handler.service';
import { HttpServiceService } from './http-service.service';
import { StorageServiceService } from './storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private httpService: HttpServiceService,
    private cookieService:CookieHandlerService,
    private storageService:StorageServiceService,
    private router: Router) { }

  //=============== coachings =================================================
  allCoachingsData$ = new BehaviorSubject<any>('');
  loggedInCoachingData$ = new BehaviorSubject<any>('');
  getAllCoachings() {
    return this.httpService.getCall('/coachings');  
  }
  storeCoachingDataInBehaviourData(data:any){
    this.allCoachingsData$.next(data);
  }
  storeCoachingDataIntoStorage(coachingData:any){
    this.storageService.store(ConfigurationsFile.COACHING_ADMIN_LOGGED_IN,coachingData).then(coachingDetails=>{
      if(coachingDetails){
        this.loggedInCoachingData$.next(coachingDetails);
      }
    })
  }
  signUpCoaching(coachingData:any){
    return this.httpService.postCall('/coaching-signup',coachingData);
  }
  getCoachingDetails(){
    let jwtToken=this.cookieService.getCookie("jwt");
    let bearerToken="Bearer "+jwtToken.jwt;
    // console.log(bearerToken);
    return this.httpService.getAuthHeaderCall('/coaching-admin',bearerToken);
  }
  getCoachingLoggedInFromStorage(){
    return this.storageService.get(ConfigurationsFile.COACHING_ADMIN_LOGGED_IN).then(coachingDetails=>{
      if(coachingDetails){
        this.loggedInCoachingData$.next(coachingDetails);
        return coachingDetails;
      }
    })
  }
  logoutCoachingAdminLoggedIn(){
    this.storageService.removeItem(ConfigurationsFile.COACHING_ADMIN_LOGGED_IN).then(res=>{
         this.logoutUserLoggedIn();
        this.loggedInCoachingData$.next('');
        this.router.navigate(['']);
    })
  }
  uploadCoachingDp(uploadImageData:any){
    let jwt=this.cookieService.getCookie("jwt");
    let bearerToken="Bearer "+jwt.jwt;
    return this.httpService.uploadCoachingDp(uploadImageData, "/upload-coaching-dp",bearerToken)
  }
  updateCoachingData(updateData:any){
    let jwt=this.cookieService.getCookie("jwt");
    let bearerToken="Bearer "+jwt.jwt;
    return this.httpService.putCall('/coaching-update',updateData,bearerToken);
  }
  //=============== XXXXXX ====================================================
  //=============== user =================================================

  loggedInUserData$ = new BehaviorSubject<any>('');
  uploadUserDp(uploadImageData:any){
    let jwt=this.cookieService.getCookie("jwt");
    let bearerToken="Bearer "+jwt.jwt;
    return this.httpService.uploadUserDp(uploadImageData, "/upload-user-dp",bearerToken)
  }
  getUserLoggedInFromStorage():Promise<any>{
    return this.storageService.get(ConfigurationsFile.LOGGED_IN_USER).then(userDetails=>{
      if(userDetails){
        this.loggedInUserData$.next(userDetails);
        return userDetails;
      }
    })
  }
  storeUserDataIntoStorage(userData:any){
    this.storageService.store(ConfigurationsFile.LOGGED_IN_USER,userData).then(userDetails=>{
      if(userDetails){
        this.loggedInUserData$.next(userDetails);
      }
    })
  }
  nullifyLoggedInUserData(){
    this.storageService.removeItem(ConfigurationsFile.LOGGED_IN_USER);
    this.loggedInUserData$.next('');
  }
  getJWTToken(userDetails: any) {
    let body = "username=" + userDetails.userName + "&password=" + userDetails.password;
    return this.httpService.postCall('/authenticate', userDetails);
  }
  getUserDetails(){
    let jwtToken=this.cookieService.getCookie("jwt");
    let bearerToken="Bearer "+jwtToken.jwt;
    console.log(bearerToken);
    return this.httpService.getAuthHeaderCall('/user',bearerToken);
  }
  logoutUserLoggedIn(){
    this.storageService.removeItem(ConfigurationsFile.LOGGED_IN_USER).then(res=>{
        this.loggedInUserData$.next('');
        this.router.navigate(['']);
    })
  }
  updateUserLoggedInToTheServer(userDetails:any){
    let jwt=this.cookieService.getCookie("jwt");
    let bearerToken="Bearer "+jwt.jwt;
    return this.httpService.putCall('/update',userDetails,bearerToken);
  }
  signUpUser(userData:any){
    return this.httpService.postCall('/user-signup',userData);
  }
  //=============== XXXXXX ====================================================
  // =============== Courses ==================================================
  listOfCoursesData$ = new BehaviorSubject<any>('');
  listOfExamsData$ = new BehaviorSubject<any>('');
  listOfPdfsData$ = new BehaviorSubject<any>('');
  listOfVideosData$ = new BehaviorSubject<any>('');
  testingdata$ = new BehaviorSubject<any>('');
  getListOfCourses(){
    this.storageService.get(ConfigurationsFile.ALL_COURSES).then(course=>{
      if(course){
        this.listOfCoursesData$.next(course);
      }
    })
  }
  getListOfExams(){
    this.storageService.get(ConfigurationsFile.ALL_EXAMS).then(exam=>{
      if(exam){
        this.listOfExamsData$.next(exam);
      }
    })
  }
  getListOfPdfs(){
    this.storageService.get(ConfigurationsFile.ALL_PDFS).then(pdf=>{
      if(pdf){
        this.listOfPdfsData$.next(pdf);
    }
    })
  }
  getListOfVideos(){
    this.storageService.get(ConfigurationsFile.ALL_VIDEOS).then(video=>{
      if(video){
        this.listOfVideosData$.next(video);
      }
    })
  }
  getAllItemsFromStorage(){
    this.getListOfCourses();
    this.getListOfExams();
    this.getListOfPdfs();
    this.getListOfVideos();
  }
  testing(){
    this.testingdata$.next('its working');
    return "lol";
  }
  updateCourseIntoTheDatabase(courseData:any){
    //console.log(courseData);
    let jwt=this.cookieService.getCookie("jwt");
    let bearerToken="Bearer "+jwt.jwt;
    return this.httpService.putCall('/course-update',courseData,bearerToken);
  }
  //=================== XXXXXXXXX =============================================
  //================== Exams ==================================================
  getQuestionsForTheExam(examData:any){
    //console.log(examData);
    let jwt=this.cookieService.getCookie("jwt");
    let bearerToken="Bearer "+jwt.jwt;
    return this.httpService.postCallToken('/exam-questions',examData,bearerToken);
  }
  updateExamInTheCourse(examData:any){
    //console.log(examData);
    let jwt=this.cookieService.getCookie("jwt");
    let bearerToken="Bearer "+jwt.jwt;
    return this.httpService.putCall('/exam-update',examData,bearerToken);
  }
  uploadQuestionsToTheServer(questionData:any){
    //console.log(JSON.stringify(questionData));
    let jwt=this.cookieService.getCookie("jwt");
    let bearerToken="Bearer "+jwt.jwt;
    return this.httpService.putCall('/questions-update',questionData,bearerToken);
  }
  //==================== XXX ==================================================
}


//https://www.youtube.com/watch?v=2t-XYdzKpQ4