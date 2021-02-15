import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigurationsFile } from 'src/app/config/configurations';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { PublitioHandlerService } from 'src/app/services/publitio-handler.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-pdf-gallery',
  templateUrl: './pdf-gallery.component.html',
  styleUrls: ['./pdf-gallery.component.css']
})
export class PdfGalleryComponent implements OnInit,OnChanges {

  pdfs:any=[];
  pdfToPlay:any=[];
  isLoading=false;
  pdfSrcChanged="";
  pdfSrc="../../../assets/pdfs/Mradul_mishra_Mobile.pdf";
  //pdfSrc="https://media.publit.io/file/CV-a.pdf";
  constructor(private route:ActivatedRoute,
    private authService:AuthServiceService,
    private storageService:StorageServiceService,
    private fileStrogeService:PublitioHandlerService) { }
  ngOnInit(): void {
    let pdfIndex = this.route.snapshot.params['pdfIndex'];
    //console.log("video index",pdfIndex);
    this.storageService.get(ConfigurationsFile.COURSE_PDFS_IN_GALLERY).then((pdfArray:any)=>{
      if(pdfArray){
        console.log("pdf file selected :",pdfArray);
        this.pdfs=pdfArray;
        this.initialiseVariablesForPlaying(pdfIndex);
        this.fileStrogeService.getFile(this.pdfToPlay.pdfFileId).then((res)=>{
          if(res.code=="200"){
            this.pdfSrc=res.url_preview;
            console.log(this.pdfSrc);
            this.isLoading=false;
          }
        })
        
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
    this.fileStrogeService.getFile(this.pdfToPlay.pdfFileId).then((res)=>{
      if(res.code=="200"){
        console.log(res);
        this.pdfSrcChanged=res.url_preview;
        console.log(this.pdfSrcChanged);
        this.pdfSrc=this.pdfSrcChanged;
      }
    })
  }
  ngOnChanges(){
    console.log(this.pdfSrc);
    this.pdfSrc=this.pdfSrcChanged;
  }

}
