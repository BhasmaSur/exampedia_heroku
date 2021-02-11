import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ConfigurationsFile } from '../config/configurations';
import { AuthServiceService } from '../services/auth-service.service';
import { StorageServiceService } from '../services/storage-service.service';

@Injectable({
    providedIn: 'root'
})
export class coachingsResolver implements Resolve<any>{

    courseList: any = [];
    examList: any = [];
    videoList: any = [];
    pdfList: any = [];
    allCoachingArray: any = [];
    constructor(private authService: AuthServiceService,
        private route: ActivatedRoute,
        private storageService: StorageServiceService,
        private cookieService:CookieService) {
    }
    resolve() {
        return this.authService.getAllCoachings().subscribe(coachings => {
            if (coachings) {
               // console.log("All coachings :\n", coachings);
                this.authService.storeCoachingDataInBehaviourData(coachings);
                this.storageService.store(ConfigurationsFile.ALL_COACHINGS, coachings).then(opSuccess => {
                    if (opSuccess) {
                        this.allCoachingArray = coachings;
                        this.initialiseStorageVariables();
                        this.checkForJwtInCookie();
                        this.authService.getAllItemsFromStorage();
                    }
                })
            }
        })
    }
    checkForJwtInCookie(){
       let userJwt=this.cookieService.get('jwt');
       if(userJwt==null){
           this.authService.nullifyLoggedInUserData();
       }
       else{
           this.authService.getUserLoggedInFromStorage();
       }
    }
    initialiseStorageVariables() {
        for (let iCoaching = 0; iCoaching < this.allCoachingArray.length; iCoaching++) {
            for (let iCourse = 0; iCourse < this.allCoachingArray[iCoaching].coachingCourses.length; iCourse++) {
                if(!this.courseList.includes(this.allCoachingArray[iCoaching].coachingCourses[iCourse].courseName)){
                    this.courseList.push(this.allCoachingArray[iCoaching].coachingCourses[iCourse].courseName);
                }
                for (let iExam = 0; iExam < this.allCoachingArray[iCoaching].coachingCourses[iCourse].courseExams.length; iExam++) {
                    if(!this.examList.includes(this.allCoachingArray[iCoaching].coachingCourses[iCourse].courseExams[iExam].examName)){
                        this.examList.push(this.allCoachingArray[iCoaching].coachingCourses[iCourse].courseExams[iExam].examName);
                    }    
                }
                for (let iVideo = 0; iVideo < this.allCoachingArray[iCoaching].coachingCourses[iCourse].courseVideos.length; iVideo++) {
                    if(!this.videoList.includes(this.allCoachingArray[iCoaching].coachingCourses[iCourse].courseVideos[iVideo].videoName)){
                        this.videoList.push(this.allCoachingArray[iCoaching].coachingCourses[iCourse].courseVideos[iVideo].videoName);
                    }
                }
                for (let iPdf = 0; iPdf < this.allCoachingArray[iCoaching].coachingCourses[iCourse].coursePdfs.length; iPdf++) {
                    if(!this.pdfList.includes(this.allCoachingArray[iCoaching].coachingCourses[iCourse].coursePdfs[iPdf].pdfName)){
                        this.pdfList.push(this.allCoachingArray[iCoaching].coachingCourses[iCourse].coursePdfs[iPdf].pdfName);
                    }
                }
            }
            this.storageService.store(ConfigurationsFile.ALL_COURSES, this.courseList);
            this.storageService.store(ConfigurationsFile.ALL_EXAMS, this.examList);
            this.storageService.store(ConfigurationsFile.ALL_VIDEOS, this.videoList);
            this.storageService.store(ConfigurationsFile.ALL_PDFS, this.pdfList);

        }
      
      /*  console.log("course lists :", this.courseList);
        console.log("Exam lists :", this.examList);
        console.log("video lists :", this.videoList);
        console.log("pdf lists :", this.pdfList);*/
       
    }
}

