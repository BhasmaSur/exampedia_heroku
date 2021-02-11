import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-item-box',
  templateUrl: './item-box.component.html',
  styleUrls: ['./item-box.component.css']
})
export class ItemBoxComponent implements OnInit {

  constructor() { }
  actionDue="Go To Page";
  statusSubscription="Not Subscribed";
  @Input() items:any;
  @Output() onCoachingSelectedToView:EventEmitter<any>=new EventEmitter<any>(); 
  @Output() onClickOnGoToCoachingsPage:EventEmitter<any>=new EventEmitter<any>();
  ngOnInit(): void {
  }
  viewCoachingDetailClicked(item:any){
    this.onCoachingSelectedToView.emit(item);
  }
  subcribeButtonClicked(id:any){
      this.onClickOnGoToCoachingsPage.emit(id);
  }
  formatCourses(item:any,course:any,i:any){
   // console.log("==============",item.coachingName,i,course.courseName,"==============");
    if(course.courseName==null){
      return "No courses";
    }
    if(i==0){
      return course.courseName;
    }
    else{
      return ","+course.courseName;
    }
  }
}
