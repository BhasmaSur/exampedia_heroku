import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-added-successfully',
  templateUrl: './added-successfully.component.html',
  styleUrls: ['./added-successfully.component.css']
})
export class AddedSuccessfullyComponent implements OnInit {

  coachingId:any;
  constructor(private router: Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.coachingId=this.route.snapshot.params["id"];
  }
  goToCoachingEditpage(){
    this.router.navigate(['coaching-edit',{id:this.coachingId}]);
  }

}
