import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigurationsFile } from 'src/app/config/configurations';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-video-gallery',
  templateUrl: './video-gallery.component.html',
  styleUrls: ['./video-gallery.component.css']
})
export class VideoGalleryComponent implements OnInit {

  isLoading=true;
  videos:any=[];
  videoToPlay:any=[];
  constructor(private route:ActivatedRoute,
    private authService:AuthServiceService,
    private storageService:StorageServiceService) { }

  ngOnInit(): void {
    let videoIndex = this.route.snapshot.params['videoIndex'];
    console.log("video index",videoIndex);
    this.storageService.get(ConfigurationsFile.COURSE_VIDEO_IN_GALLERY).then(videoArray=>{
      if(videoArray){
        this.videos=videoArray;
        this.initialiseVariablesForPlaying(videoIndex)
        this.isLoading=false;
      }
    })
  }
  initialiseVariablesForPlaying(index:any){
    for(let i=0;i< this.videos.length;i++){
      if(this.videos[i].videoId==index){
        this.videoToPlay=this.videos[i];
      }
    } 
  }
  videoSelected(video:any){
    console.log(video);
    this.videoToPlay=video;
  }
}
