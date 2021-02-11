import { Component, Input, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { PublitioHandlerService } from 'src/app/services/publitio-handler.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private publitioService:PublitioHandlerService){

  }
  ngOnInit(){
    this.publitioService.getList("userpics").then(res=>{
      if(res){
        console.log(res);
      }
    })
  }
  sendTheFile(event:any){

  }
}
