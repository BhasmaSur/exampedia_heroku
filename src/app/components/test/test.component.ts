import { Component, Input, OnInit } from '@angular/core';
import { ConfigurationsFile } from 'src/app/config/configurations';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { PublitioHandlerService } from 'src/app/services/publitio-handler.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {


  constructor(private publitioService:PublitioHandlerService,
    private storageService:StorageServiceService){

  }
  ngOnInit(){
    this.storageService.get(ConfigurationsFile.COURSE_PDFS_IN_GALLERY).then((res:any)=>{
      if(res){
        console.log(res);
      }
    })
  }

}
