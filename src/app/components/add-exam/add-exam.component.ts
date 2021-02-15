import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationsFile } from 'src/app/config/configurations';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css']
})
export class AddExamComponent implements OnInit {

  isLoading=false;
  fileCurrentlySelected:any;
  worksheetCurrentlyOpened:any;
  uploadedQuestions:any=[];
  examId:any;
  courseId:any;
  questionArray:any=[];
  examObject:any={};
  coachingId:any;
  //================== Form Variables ====================================================
  form: FormGroup=new FormGroup({
    $key:new FormControl(null),
    examName:new FormControl(null,Validators.required),
    examTips:new FormControl(null,Validators.required),
    examSubjects:new FormControl(null,Validators.required),
    examFees:new FormControl(null,[Validators.required,this.examCostIsNumeric]),
    examSoldSeparately:new FormControl(null,Validators.required),
    examMarks:new FormControl(null,Validators.required),
    examTime:new FormControl(null,Validators.required)
  })
  //================== XXXXXXX ===========================================================
  constructor(private storageService:StorageServiceService,
    private route:ActivatedRoute,
    private authService:AuthServiceService,
    private router: Router) { }

  ngOnInit(): void {
    this.coachingId=this.route.snapshot.params["id"];
    this.storageService.get(ConfigurationsFile.COACHING_COURSE_IN_FOCUS).then(courseSelected=>{
      if(courseSelected){
        console.log(courseSelected.courseId);
        this.courseId=courseSelected.courseId;
        
      }
    })
  }
  selectedOption(value:any){
    console.log(this.form.controls['examSoldSeparately'].value);
    
  }
  extractQuestionsFromExcel(event:any){
    const target : DataTransfer = <DataTransfer>(event.target);
    if(target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = ( e:any)=>{
      const bstr : string = e.target.result;
      const wb:XLSX.WorkBook = XLSX.read(bstr,{type:'binary'});
      const wsName:string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet=wb.Sheets[wsName];
      //console.log("worksheet uploaded : ",ws);
      this.worksheetCurrentlyOpened=ws;
      console.log(this.worksheetCurrentlyOpened);
      this.createQuestionsArray();
    }
    reader.readAsBinaryString(target.files[0]);
  }
  handleFileInput(file:any){
    //console.log("normal file : ",file.target.files);
    this.fileCurrentlySelected=file;
    
  }
  submitExamForm(){
    //console.log(this.fileCurrentlySelected);
    console.log(this.form);
    this.createExamDataArray();
    // this.authService.updateExamInTheCourse(this.examObject).subscribe((examReturned:any)=>{
    //   if(examReturned){
    //     console.log("exam returned : ",examReturned);
    //     this.examId=examReturned.examId;
    //     this.extractQuestionsFromExcel(this.fileCurrentlySelected);
    //   }
    // })
    console.log(JSON.stringify(this.examObject));
  }
  createExamDataArray(){
    let examData={
      examId:1,
      examName:this.form.controls['examName'].value,
      examFees:this.form.controls['examFees'].value,
      examDescription:this.form.controls['examTips'].value,
      examSoldSeparately:this.form.controls['examSoldSeparately'].value,
      examSubjects:this.form.controls['examSubjects'].value,
      examCourseId:this.courseId,
      examMarks:this.form.controls['examMarks'].value,
      examTime:this.form.controls['examTime'].value
  }
  this.examObject=examData;

  }
  createQuestionsArray(){
    let questionArray:any=[];
   for(let iCol=2;iCol < 7 ; iCol++){
     var baseChr= String.fromCharCode(64+iCol);
     let questionObj={
      examId:this.examId,
      type:this.worksheetCurrentlyOpened[baseChr+1].h,
      statement:this.worksheetCurrentlyOpened[baseChr+2].h,
      answer:this.worksheetCurrentlyOpened[baseChr+3].h,
      optionA:this.worksheetCurrentlyOpened[baseChr+4]==null?"NaN":this.worksheetCurrentlyOpened[baseChr+4].h,
      optionB:this.worksheetCurrentlyOpened[baseChr+5]==null?"NaN":this.worksheetCurrentlyOpened[baseChr+5].h,
      optionC:this.worksheetCurrentlyOpened[baseChr+6]==null?"NaN":this.worksheetCurrentlyOpened[baseChr+6].h,
      optionD:this.worksheetCurrentlyOpened[baseChr+7]==null?"NaN":this.worksheetCurrentlyOpened[baseChr+7].h,
      marks:this.worksheetCurrentlyOpened[baseChr+8].w
    }
    questionArray.push(questionObj);
   
   }
   this.questionArray=questionArray;
   //console.log(JSON.stringify(questionArray));
   this.authService.uploadQuestionsToTheServer(this.questionArray).subscribe(questionRes=>{
    if(questionRes){
      //console.log(questionRes);
      alert("Exam added successfully");
      this.router.navigate(['coaching-edit']);
    }
  })
  }
  examCostIsNumeric(controlCost:FormControl){
    if(controlCost.value == "lol"){
      return {"notANumber":true};
    }
    return null;
  }
}
//[disabled]="!form.valid"