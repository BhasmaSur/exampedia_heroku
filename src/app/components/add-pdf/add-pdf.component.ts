import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationsFile } from 'src/app/config/configurations';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { PublitioHandlerService } from 'src/app/services/publitio-handler.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-add-pdf',
  templateUrl: './add-pdf.component.html',
  styleUrls: ['./add-pdf.component.css']
})
export class AddPdfComponent implements OnInit {


  isLoading = false;
  coachingId: any = "";
  courseId: any = "";
  fileCurrentlySelected: any;
  pdfToUpdateArray: any = {};
  fileName = "";
  fileId = "";
  pdfDataReturned:any=[];
  courseEdited:any=[];
  fileAddedSuccessfully=false;
  //================== Form Variables ====================================================
  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    pdfName: new FormControl(null, Validators.required),
    pdfDescription: new FormControl(null, Validators.required),
    pdfSubjects: new FormControl(null, Validators.required),
  })
  //================== XXXXXXX ===========================================================
  // =======================================variables=====================
  constructor(private storageService: StorageServiceService,
    private route: ActivatedRoute,
    private authService: AuthServiceService,
    private router: Router,
    private fileStorageService: PublitioHandlerService) { }

  ngOnInit(): void {
    this.coachingId = this.route.snapshot.params["id"];
    // console.log(this.coachingId);
    this.storageService.get(ConfigurationsFile.COACHING_COURSE_IN_FOCUS).then(courseSelected => {
      if (courseSelected) {
        // console.log(courseSelected.courseId);
        this.courseEdited=courseSelected;
        this.courseId = courseSelected.courseId;
      }
    })
  }
  submitPdfForm() {
    // console.log(this.fileCurrentlySelected.target.files[0]);
    if (this.fileCurrentlySelected) {
      let itemData = {
        name: this.form.controls['pdfName'].value,
        description: this.form.controls['pdfDescription'].value,
        coaching_id:this.coachingId
      }
      let selectedFile = this.fileCurrentlySelected.target.files[0];
      this.createFolderForTheCoaching(this.coachingId).then(() => {
        this.fileStorageService.uploadFile(selectedFile, itemData).then((res: any) => {
          if (res.code=="201") {
            console.log(res);
            this.pdfDataReturned=res;
            this.fileAddedSuccessfully=true;
          }
          else if(res.code=="403"){
            console.log("file too large");
            this.fileAddedSuccessfully=false;
          }
        })
          .then(() => {
            if(this.fileAddedSuccessfully){
              console.log("its loaded on to the server");
              this.createPDFArray(this.pdfDataReturned.title,this.pdfDataReturned.id);
              this.authService.uploadPdfToServer(this.pdfToUpdateArray).subscribe((coachingDetails)=>{
                if(coachingDetails){
                  // console.log(pdfDetails);
                  this.authService.storeCoachingDataIntoStorage(coachingDetails);
                  alert("Pdf added successfully");
                  this.router.navigate(['coaching-edit']);
                }
              })
            }
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
  createPDFArray(fileName: any, fileId: any) {
    let pdfArray = {
      pdfName: this.form.controls['pdfName'].value,
      pdfDescription: this.form.controls['pdfDescription'].value,
      pdfSubjects: this.form.controls['pdfSubjects'].value,
      pdfFileName: fileName,
      pdfFileId: fileId,
      pdfCourseId:this.courseId
    }
    this.pdfToUpdateArray = pdfArray;
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
