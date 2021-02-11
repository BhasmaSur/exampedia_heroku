import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  coachingId:any="";
    courseToBeAdded:any={};
    isLoading=false;
    //================== Form Variables ====================================================
    form: FormGroup=new FormGroup({
      $key:new FormControl(null),
      courseName:new FormControl(null,Validators.required),
      courseDescription:new FormControl(null,Validators.required),
      courseSubjects:new FormControl(null,Validators.required),
      courseFees:new FormControl(null,Validators.required),
      courseSyllabus:new FormControl(null,Validators.required),
      courseHours:new FormControl(null,Validators.required),
      courseProfessors:new FormControl(null,Validators.required)
    })
    //================== XXXXXXX ===========================================================
  constructor(private autherService:AuthServiceService,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.coachingId=this.route.snapshot.params['id'];
  }
  submitExamForm(){
    this.createCourseDataArray();
    console.log(JSON.stringify(this.courseToBeAdded));
    this.autherService.updateCourseIntoTheDatabase(this.courseToBeAdded).subscribe(res=>{
      if(res){
        console.log("course added successfully : "+res);
        this.router.navigate(['success',{id:this.coachingId}]);
      }
    })
  }
  createCourseDataArray(){
    let courseArray={
      courseId:-99,
      courseName:this.form.controls['courseName'].value,
      courseDescription:this.form.controls['courseDescription'].value,
      courseSubjects:this.form.controls['courseSubjects'].value,
      courseFees:this.form.controls['courseFees'].value,
      courseSyllabus:this.form.controls['courseSyllabus'].value,
      courseHours:this.form.controls['courseHours'].value,
      courseProfessors:this.form.controls['courseProfessors'].value,
    }
    this.courseToBeAdded=courseArray
  }
  selectedOption(event:any){

  }
}
