import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationsFile } from 'src/app/config/configurations';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { PublitioHandlerService } from 'src/app/services/publitio-handler.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.css']
})
export class AddVideoComponent implements OnInit {


  isLoading = false;
  coachingId: any = "";
  courseId: any = "";
  fileCurrentlySelected: any;
  videoToUpdateArray: any = {};
  fileName = "";
  fileId = "";
  videoDataReturned:any=[];
  courseEdited:any=[];
  //================== Form Variables ====================================================
  form: FormGroup=new FormGroup({
    $key:new FormControl(null),
    videoName:new FormControl(null,Validators.required),
    videoDescription:new FormControl(null,Validators.required),
    videoSubjects:new FormControl(null,Validators.required),
  })
  //================== XXXXXXX ===========================================================
  // =======================================variables=====================
  constructor(private storageService: StorageServiceService,
    private route: ActivatedRoute,
    private authService: AuthServiceService,
    private router: Router,
    private fileStorageService: PublitioHandlerService) { }

  ngOnInit(): void {
    this.coachingId=this.route.snapshot.params["id"];
    this.storageService.get(ConfigurationsFile.COACHING_COURSE_IN_FOCUS).then(courseSelected=>{
      if(courseSelected){
        // console.log(courseSelected.courseId);
        this.courseId=courseSelected.courseId;     
      }
    })
  }
  submitVideoForm() {
    // console.log(this.fileCurrentlySelected.target.files[0]);
    if (this.fileCurrentlySelected) {
      let itemData = {
        name: this.form.controls['videoName'].value,
        description: this.form.controls['videoDescription'].value,
        coaching_id:this.coachingId
      }
      let selectedFile = this.fileCurrentlySelected.target.files[0];
      this.createFolderForTheCoaching(this.coachingId).then(() => {
        this.fileStorageService.uploadFile(selectedFile, itemData).then((res: any) => {
          if (res.code=="201") {
            console.log(res);
            this.videoDataReturned=res;
          }
        })
          .then(() => {
            console.log("its loaded on to the server");
            this.createVideoArray(this.videoDataReturned.title,this.videoDataReturned.id);
            this.authService.uploadVideoToServer(this.videoToUpdateArray).subscribe((coachingDetails)=>{
              if(coachingDetails){
                // console.log(pdfDetails);
                this.authService.storeCoachingDataIntoStorage(coachingDetails);
                alert("Video added successfully");
                this.router.navigate(['coaching-edit']);
              }
            })
          })
      })

      
    }
    else {
      console.log("select the file for uploading");
    }

  }
  handleFileInput(file: any) {
    this.fileCurrentlySelected = file;
  }
  createVideoArray(fileName: any, fileId: any) {
    let videoArray = {
      videoName: this.form.controls['videoName'].value,
      videoDescription: this.form.controls['videoDescription'].value,
      videoSubject: this.form.controls['videoSubjects'].value,
      videoFileName: fileName,
      videoFileID: fileId,
      videoCourseId:this.courseId
    }
    this.videoToUpdateArray = videoArray;
    // console.log(this.pdfToUpdateArray);
  }
  createFolderForTheCoaching(coachingId: any) {
    return this.fileStorageService.createFolder(coachingId).then((res: any) => {
      if (res.code == "201") {
        console.log("new folder created");
      }
      else if (res.code == "404") {
        console.log("folder was already there");
      }
    })
  }

}
