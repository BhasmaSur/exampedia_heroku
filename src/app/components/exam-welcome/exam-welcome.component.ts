import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationsFile } from 'src/app/config/configurations';
import { StorageServiceService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-exam-welcome',
  templateUrl: './exam-welcome.component.html',
  styleUrls: ['./exam-welcome.component.css']
})
export class ExamWelcomeComponent implements OnInit {

  //=================== demo data =============================================
  examInFocus:any=[];
  examId="";
  //========================== XXXX ===========================================
  constructor(
    private storageService:StorageServiceService,
    private route: ActivatedRoute,
    private router:Router
  ) { }
  ngOnInit(): void {
    this.examId=this.route.snapshot.params['examIndex'];
    this.storageService.get(ConfigurationsFile.COURSE_EXAM_IN_GALLERY).then(exams=>{
      if(exams){
        console.log(exams,this.examId);
        this.initialiseExaminFocus(exams,this.examId);
      }
    })
  }
  initialiseExaminFocus(exams:any,id:any){
    for(let i=0;i < exams.length ; i++){
      if(exams[i].examId==id){
        this.examInFocus=exams[i]
      }
    }
  }
  startTheExam(){
    console.log("start the exam",this.examInFocus);
    this.router.navigate(['exam-paper',{examIndex:this.examId}]);
  }
}
