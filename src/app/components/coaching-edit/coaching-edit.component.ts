import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ConfigurationsFile } from 'src/app/config/configurations';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-coaching-edit',
  templateUrl: './coaching-edit.component.html',
  styleUrls: ['./coaching-edit.component.css']
})
export class CoachingEditComponent implements OnInit {

  //========================= owl caraousal ==============================================
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
  isLoading:boolean=true;
  boolUserLoggedIn=false;
  //=============================  XXX  ======================================
  //============================= coaching variables ============================
  coachingDataToDisplay:any=[];
  numberOfExams="0";
  numberOfCourses="0";
  numberOfSubscribers="0";
  strStars="0/5";
  coachingId:any="";
  //============================= XXXX ===========================================
  //================================ courses ===================================
  courseSelected:any="";
  examsToDisplay:any=[]
  videosToDisplay=[]
  pdfsToDisplay=[]
  indexOfCourseSelected=0;
  subscribeToCourse(){
    // console.log("working");
    alert("Subscribed to course");
  }
  selectCourseClicked(index:any){
    this.courseSelected=this.coachingDataToDisplay.coachingCourses[index].courseName;
    this.indexOfCourseSelected=index;
    this.initialiseItemsToDisplay(index);
  }
  //=========================== User ===========================================
  strLoggedInUser:any="LOGIN";
  //================= XXXXXXXXX ===============================================
  //============================ XXXXXXXXXXXXX =================================
    constructor(private router : Router,
      private authService:AuthServiceService,
      private storageService:StorageServiceService) { }
  
    ngOnInit(): void {
       this.authService.getCoachingLoggedInFromStorage().then(coachingDetails=>{
        if(coachingDetails){
          //console.log(userDetails);
          this.strLoggedInUser="Logout";
          this.boolUserLoggedIn=true;
          this.coachingDataToDisplay=coachingDetails;
          console.log("coaching logged in :\n",this.coachingDataToDisplay);
          this.initialiseCoachingVaribales();
          this.initialiseCoachingDp();
          this.isLoading=false;
        }
      })
    }
    initialiseCoachingDp(){
      if(this.coachingDataToDisplay.coachingPicType=="NaN"){
        this.displayPicUrl="../../../assets/images/success_bg.png";
      }
      else{
        this.base64Data = this.coachingDataToDisplay.coachingPicByte;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        this.displayPicUrl = this.retrievedImage;
      }
    }
    initialiseCoachingVaribales(){
      this.initialiseCounts();
      if(this.coachingDataToDisplay.coachingCourses.length > 0){
        this.courseSelected=this.coachingDataToDisplay.coachingCourses[0].courseName;
      }       
      this.initialiseItemsToDisplay(0);
    }
    initialiseItemsToDisplay(index:any){
      if(this.coachingDataToDisplay.coachingCourses.length > 0){
        this.videosToDisplay=this.coachingDataToDisplay.coachingCourses[index].courseVideos;
        this.examsToDisplay=this.coachingDataToDisplay.coachingCourses[index].courseExams;
        this.pdfsToDisplay=this.coachingDataToDisplay.coachingCourses[index].coursePdfs;
      }

    }
    initialiseCounts(){
      let examCount=0;
      for(let iCourse=0;iCourse < this.coachingDataToDisplay.coachingCourses.length;iCourse++){
        examCount=examCount+this.coachingDataToDisplay.coachingCourses[iCourse].courseExams.length;
      }
      this.numberOfExams=examCount.toString();
      this.numberOfCourses=(this.coachingDataToDisplay.coachingCourses.length).toString();
      if(this.coachingDataToDisplay.coachingStars == "NaN"){
        this.strStars="No ratings";
      }
     
    }
    //=============================== Login ==========================================
    openLoginProfile(){
      this.authService.logoutCoachingAdminLoggedIn();  
    }
    //================================ XXXX ==========================================
    //=============================== videos ========================================
    navigateToVideoGallery(id:any){
      this.storageService.store(ConfigurationsFile.COURSE_VIDEO_IN_GALLERY,this.videosToDisplay).then(res=>{
        if(res){
          this.router.navigate(['video-gallery',{videoIndex:id}]);
        }
      })
    }
    //============================= XXXXXX ==========================================
    //================================= pdfs =========================================
    navigateToPdfGallery(id:any){
      this.storageService.store(ConfigurationsFile.COURSE_PDFS_IN_GALLERY,this.pdfsToDisplay).then(res=>{
        if(res){
          this.router.navigate(['pdf-gallery',{pdfIndex:id}]);
        }
      })
    }
    //========================== XXXX ================================================
    //============================= Exams ===========================================
    navigateToExamsGallery(id:any){
      this.storageService.store(ConfigurationsFile.COURSE_EXAM_IN_GALLERY,this.examsToDisplay).then(res=>{
        if(res){
          this.router.navigate(['exam-welcome',{examIndex:id}]);
        }
      })
    }
    //=============== XXXX ===========================================================
  //=============================  background image ===============================
  displayPicUrl="../../../assets/images/success_bg.png";
  selectedFile!: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  imageName: any;
  message: any = ""
  changeBackground(e:any){
    console.log(e.target.files[0]);
    if (e.target.files && e.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event : Event) => { 
        //this.displayPicUrl = reader.result as string;

      }
    }
    else{
      console.log("object is null");
    }
    this.selectedFile = e.target.files[0];
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.authService.uploadCoachingDp(uploadImageData).subscribe(res => {
      if (res.status === 200) {
         console.log(res);
        this.retrieveResonse = res.body;
        this.base64Data = this.retrieveResonse.picByte;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        this.displayPicUrl = this.retrievedImage;
        console.log("coaching data " ,this.coachingDataToDisplay);
        this.coachingDataToDisplay.coachingPicByte=this.retrieveResonse.picByte;
        this.coachingDataToDisplay.coachingPicType=this.retrieveResonse.picType;
        this.authService.storeCoachingDataIntoStorage(this.coachingDataToDisplay);
      }
    })
  }
  //=============================== XXXXXXXXXXX ===============================
  //=============================== Add Videos to the course =================
  addVideoToTheCourse(){
    console.log("add course");
  }
  //================================ XXXXXXXXX ==============================
  //=============================== Add Exams to the course ==================
  addExamToTheCourse(){
    //console.log("add exam");
    this.storageService.store(ConfigurationsFile.COACHING_COURSE_IN_FOCUS,this.coachingDataToDisplay.coachingCourses[this.indexOfCourseSelected]).then(res=>{
      if(res){
        this.router.navigate(['add-exam',{id:this.coachingId}]);
      }
    })
  }
  //=============================== XXXXXXXXX ==============================
  //============================== Add Pdfs to the course ================
  addPdfToTheCourse(){
    console.log("add pdf");
  }
  //============================ XXXXXXX ==================================
  //======================== ADD course into coaching ======================
  addCourseIntoCoaching(){
    this.router.navigate(['add-course',{id:this.coachingId}]);
  }
  //========================== XXXXX ======================================
  saveCoachingDataInDatabase(){
    console.log("data sending to the server",this.coachingDataToDisplay);
    this.authService.updateCoachingData(this.coachingDataToDisplay).subscribe((res:any)=>{
      if(res){
        console.log(res);
      }
    })
  }
}
