import { Component } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router,Event, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ExampediaWeb';
  isLoading=false;
  constructor(private router:Router){
    this.router.events.subscribe((event:Event)=>{
      switch(true){
        case event instanceof NavigationStart:{
          this.isLoading=true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError:{
          this.isLoading=false;
          break;
        }
        default:{
          break;
        }
      }
    })
  }
}
