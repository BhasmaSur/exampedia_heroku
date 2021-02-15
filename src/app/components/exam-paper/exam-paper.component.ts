import { utf8Encode } from '@angular/compiler/src/util';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { CountdownComponent } from 'ngx-countdown';
import { ConfigurationsFile } from 'src/app/config/configurations';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';
@Component({
  selector: 'app-exam-paper',
  templateUrl: './exam-paper.component.html',
  styleUrls: ['./exam-paper.component.css']
})
export class ExamPaperComponent implements OnInit {

  //================== common paper =========================================================
  @ViewChild('cd', { static: true }) private countdown!: CountdownComponent;
  examTime={
    leftTime: 100,
    notify: [ 1 ],
    demand:true
  }
  questionIndex=1;
  questions:any = [];
  answers:any;
  tempAnswer:any;
  isLoading=true;
  indexInFocus: number = 0;
  questionType = "ESSAY";
  questionForm: any;
  isMCQ = false;
  isTrueFalse = false;
  isEssay = false;
  isSelectAll = false;
  allExamsInCourse:any=[];
  examToStart:any=[];
  focusedQuestion = {
    id: "5",
    statement: "asd jdb efbhe jefb fejbf jfebfje jefbje ejfbjef jefbje fjebfjej",
    marks: "3",
    option_A: "A",
    option_B: "B",
    option_C: "C",
    option_D: "D"
  }
  //======================= XXXX ===========================================================
  constructor(private formBuilder: FormBuilder,
    private route:ActivatedRoute,
    private storageService:StorageServiceService,
    private authService:AuthServiceService,
    private router:Router) { }

  ngOnInit(): void {
    this.authService.getUserLoggedInFromStorage();
    let examID=this.route.snapshot.params['examIndex'];
    this.storageService.get(ConfigurationsFile.COURSE_EXAM_IN_GALLERY).then(examsArray=>{
      if(examsArray){
        this.allExamsInCourse=examsArray;
        this.initialiseExamVarible(examID);
        this.authService.getQuestionsForTheExam(this.examToStart).subscribe(questions=>{
          if(questions){
            console.log(questions);
            this.questions=questions;
            this.answers=new Array<number>(this.questions.length);
            this.setFocusedQuestion(this.indexInFocus);
            this.isLoading=false;
            this.countdown.begin();
            //this.questionForm.controls['options'].setValue("A");
          }
        })
       
      }
    })
  }
  pauseTimer(){
    this.countdown.pause();
  }
  examOver(event:any){
    //console.log(event);
    if(event.action=="done"){
      this.authService.loggedInUserData$.subscribe((userRet:any)=>{
        if(userRet){
          console.log(userRet);
          if(userRet.roles=="COACHING"){
            this.router.navigate(['coaching-preview']);
          }
          else{
            this.router.navigate(['exam-over']);
          }
        }
      })
      
    }
    
  }
  setFocusedQuestion(index: any) {
    this.focusedQuestion={
      id:this.questions[this.indexInFocus].questionId,
      statement:this.questions[this.indexInFocus].statement,
      marks:this.questions[this.indexInFocus].marks,
      option_A: this.questions[this.indexInFocus].optionA,
      option_B: this.questions[this.indexInFocus].optionB,
      option_C: this.questions[this.indexInFocus].optionC,
      option_D: this.questions[this.indexInFocus].optionD
    }
    this.questionType=this.questions[this.indexInFocus].type;
    this.initialiseFormGroup(this.questionType);
    this.setAnswersToTheFocusedQuestion();
  }
  setAnswersToTheFocusedQuestion(){
    if(this.answers[this.indexInFocus]!=null){
      //console.log("answer should be saved",this.answers[this.indexInFocus]);
      if(this.questionType=="SELECT_ALL"){
       let checkboxAnswerArray=this.answers[this.indexInFocus].split(",");
       console.log(checkboxAnswerArray);
       for(let i=0;i < checkboxAnswerArray.length ;i++){
        if(checkboxAnswerArray[i]=="A"){
          this.questionForm.controls['option_A'].setValue(true);
         }
         if(checkboxAnswerArray[i]=="B"){
          this.questionForm.controls['option_B'].setValue(true);
         }
         if(checkboxAnswerArray[i]=="C"){
          this.questionForm.controls['option_C'].setValue(true);
         }
         if(checkboxAnswerArray[i]=="D"){
          this.questionForm.controls['option_D'].setValue(true);
         }
       }
       
      }
      else if(this.questionType=="MCQ"){
        this.questionForm.controls['options'].setValue(this.answers[this.indexInFocus]);
      }
      else if(this.questionType=="TRUE_FALSE"){
        this.questionForm.controls['truefalse'].setValue(this.answers[this.indexInFocus]);
      }
      else if(this.questionType=="ESSAY"){
        this.questionForm.controls['essay'].setValue(this.answers[this.indexInFocus]);
      }
    }
  }
  initialiseExamVarible(index:any){
    this.indexInFocus=0;
    for(let i=0;i< this.allExamsInCourse.length;i++){
      if(this.allExamsInCourse[i].examId==index){
        this.examToStart=this.allExamsInCourse[i];
       // this.examTime.leftTime=parseInt(this.examToStart.examTime);
        this.examTime={
          leftTime: parseInt(this.examToStart.examTime),
          notify: [ 1 ],
          demand:true
        }
      }
    } 
  }
  initialiseFormGroup(type: any) {
    switch (type) {
      case "MCQ":
        this.isMCQ=true;
        this.isTrueFalse = false;
        this.isEssay = false;
        this.isSelectAll = false;
        this.questionForm = this.formBuilder.group({
          options: ['',Validators.required]
        })
        break;
      case "TRUE_FALSE":
        this.isMCQ=false;
        this.isTrueFalse = true;
        this.isEssay = false;
        this.isSelectAll = false;
        this.questionForm = this.formBuilder.group({
          truefalse: ['',Validators.required]
        })
        break;
      case "ESSAY":
        this.isMCQ=false;
        this.isTrueFalse = false;
        this.isEssay = true;
        this.isSelectAll = false;
        this.questionForm = this.formBuilder.group({
          essay: ['',Validators.required]
        })
        break;
      case "SELECT_ALL":
        this.isMCQ=false;
        this.isTrueFalse = false;
        this.isEssay = false;
        this.isSelectAll = true;
        this.questionForm = this.formBuilder.group({
          option_A:[''],
          option_B:[''],
          option_C:[''],
          option_D:['']
        })
        break;
    }
  }
  saveAnswerToTheQuestion() {
    if(this.validateIfAnswersAreProvided()){
      if(this.questionType=="SELECT_ALL"){
        let count=0;
        for(let i = 0;i < 4 ;i++){
          if(this.checkboxAnswer[i]=="Z"){
  
          }
          else{
            if(count==0){
              this.tempAnswer=this.checkboxAnswer[i];
              count=count+1;
            }
            else{
              this.tempAnswer=this.tempAnswer+","+this.checkboxAnswer[i];
            }
          }
        }
      }
     // this.questionForm.controls['options'].setValue(this.tempAnswer);
      this.answers[this.indexInFocus]=this.tempAnswer;
      console.log(this.answers);     
    }
    else{
      this.answers[this.indexInFocus]=null;
      console.log("answer not provided");
    } 
  }
  validateIfAnswersAreProvided():boolean{
    if(this.questionType=="SELECT_ALL"){
      let count=0;
      for(let i = 0;i < 4; i++){
        if(this.checkboxAnswer[i]=="Z"){
          count=count+1;
        }
      }
      if(count==4){
        return false;
      }
      else{
        return true;
      }
    }
    return true;
  }
  changeMCQAnswer(event: any) {
    //console.log("mcq",event.target.value);
    this.tempAnswer=event.target.value;
  }
  checkboxAnswer:any=["Z","Z","Z","Z"];
  changeCheckBoxAnswer(event: any){
    //console.log("checkbox",event.target.value);
    let changedValue=parseInt(event.target.value);
    if(this.checkboxAnswer[changedValue]=="Z"){
      //console.log(changedValue,"because empty");
      if(changedValue==0){
        this.checkboxAnswer[changedValue]="A";
      }
      else if(changedValue==1){
        this.checkboxAnswer[changedValue]="B";
      }
      else if(changedValue==2){
        this.checkboxAnswer[changedValue]="C";
      }
      else if(changedValue==3){
        this.checkboxAnswer[changedValue]="D";
      } 
    }
    else{
      this.checkboxAnswer[changedValue]="Z";
    }
    console.log(this.checkboxAnswer);
  }
  changeEssayAnswer(event: any){
    //console.log("essay",event.target.value);
    this.tempAnswer=event.target.value;
  }
  showNextQuestion(){
    //console.log("next question",this.indexInFocus,this.questions.length);

    if(this.indexInFocus+1 < this.questions.length){
      this.indexInFocus=this.indexInFocus+1;
      this.setFocusedQuestion(this.indexInFocus);
    }

  }
  showPreviousQuestion(){
    if(this.indexInFocus > 0){
      this.indexInFocus=this.indexInFocus-1;
      this.setFocusedQuestion(this.indexInFocus);
    }

  }
  setCircleSelectedQuestion(questionIndex:any){
    this.indexInFocus=questionIndex;
    this.setFocusedQuestion(this.indexInFocus);
  }
}

