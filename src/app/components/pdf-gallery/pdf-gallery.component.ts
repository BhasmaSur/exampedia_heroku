import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigurationsFile } from 'src/app/config/configurations';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-pdf-gallery',
  templateUrl: './pdf-gallery.component.html',
  styleUrls: ['./pdf-gallery.component.css']
})
export class PdfGalleryComponent implements OnInit {

  pdfs:any=[];
  pdfToPlay:any=[];
  isLoading=false;
  pdfSrc="../../../assets/pdfs/Mradul_mishra_Mobile.pdf";
  constructor(private route:ActivatedRoute,
    private authService:AuthServiceService,
    private storageService:StorageServiceService) { }
  ngOnInit(): void {
    let pdfIndex = this.route.snapshot.params['pdfIndex'];
    //console.log("video index",pdfIndex);
    this.storageService.get(ConfigurationsFile.COURSE_PDFS_IN_GALLERY).then(pdfArray=>{
      if(pdfArray){
        this.pdfs=pdfArray;
        this.initialiseVariablesForPlaying(pdfIndex)
        this.isLoading=false;
      }
    })
  }
  initialiseVariablesForPlaying(index:any){
    for(let i=0;i< this.pdfs.length;i++){
      if(this.pdfs[i].pdfId==index){
        this.pdfToPlay=this.pdfs[i];
      }
    } 
  }
  pdfSelected(pdf:any){
    //console.log(pdf);
    this.pdfToPlay=pdf;
  }
}
