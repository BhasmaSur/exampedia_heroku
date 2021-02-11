import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-coaching-navbar',
  templateUrl: './coaching-navbar.component.html',
  styleUrls: ['./coaching-navbar.component.css']
})
export class CoachingNavbarComponent implements OnInit {
 

  //==================== Coaching variables ================================
  title = ""
  //================================== XXXX  ==================================
  //==================== user variables ================================
  @Input() user:any;  
  @Output() openLoginOrProfilePage = new EventEmitter<any>();
  //================================== XXXX  ==================================
  constructor() { }

  ngOnInit(): void {
  }
  naviagetToLoginOrProfile(){
    this.openLoginOrProfilePage.emit();
   }

}
