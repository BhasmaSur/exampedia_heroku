import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-market-navbar',
  templateUrl: './market-navbar.component.html',
  styleUrls: ['./market-navbar.component.css']
})
export class MarketNavbarComponent implements OnInit {

  @Input() user: any;
  @Input() boolShowFilterInMenu:any
  @Output() openLoginOrProfilePage = new EventEmitter<any>();
  @Output() goToView = new EventEmitter<any>();
  constructor(private router: Router) { }
  ngOnInit(): void {
  }
  naviagetToLoginOrProfile(){
   this.openLoginOrProfilePage.emit();
  }
  goToHomeView(){
    this.goToView.emit("home");
  }
  goToCoachinsView(){
    this.goToView.emit("coachings");
  }
  goToContactView(){
    this.goToView.emit("contact");
  }
}
