import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-coaching-item',
  templateUrl: './coaching-item.component.html',
  styleUrls: ['./coaching-item.component.css']
})
export class CoachingItemComponent implements OnInit {

  @Input() items:any;
  @Input() typeOfItem:any;
  @Output() itemClicked:EventEmitter<any>=new EventEmitter<any>();
  displayPic="../../../assets/images/course.jpg";

  //============================== variables =================================
  constructor() {

   }

  ngOnInit(): void {
    //console.log(this.typeOfItem);
    if(this.typeOfItem == "videos"){
      this.displayPic="../../../assets/images/video.jpg";
    }
    else if(this.typeOfItem == "exams"){
      this.displayPic="../../../assets/images/exam.jpg";
    }
    else{
      this.displayPic="../../../assets/images/pdf.jpg";
    }
  }
  viewCoachingDetailClicked(id:any){
    console.log(id);
    this.itemClicked.emit(id);
  }
  getResult(item:any){
    if(this.typeOfItem == item){
      return true;
    }
    else{
      return false;
    }
  }
}
