import { ElementRef } from '@angular/core';
import { Component, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigurationsFile } from 'src/app/config/configurations';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { PublitioHandlerService } from 'src/app/services/publitio-handler.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-video-gallery',
  templateUrl: './video-gallery.component.html',
  styleUrls: ['./video-gallery.component.css']
})
export class VideoGalleryComponent implements OnInit {

  isLoading = true;
  videos: any = [];
  videoToPlay: any = [];
  videoSrc = "";
  videoSrcChanged = "";
  videoPoster = "../../../assets/images/video.jpg";
  constructor(private route: ActivatedRoute,
    private authService: AuthServiceService,
    private storageService: StorageServiceService,
    private fileStrogeService: PublitioHandlerService,
    private elRef: ElementRef) { }

  ngOnInit(): void {
    let videoIndex = this.route.snapshot.params['videoIndex'];
    console.log("video index", videoIndex);
    this.storageService.get(ConfigurationsFile.COURSE_VIDEO_IN_GALLERY).then(videoArray => {
      if (videoArray) {
        this.videos = videoArray;
        this.initialiseVariablesForPlaying(videoIndex)
        this.fileStrogeService.getFile(this.videoToPlay.videoFileID).then((res) => {
          if (res.code == "200") {
            this.videoSrc = res.url_preview;
            this.videoPoster = res.url_thumbnail;
            console.log(this.videoSrc);
            this.isLoading = false;
          }
        })
      }
    })
  }
  initialiseVariablesForPlaying(index: any) {
    for (let i = 0; i < this.videos.length; i++) {
      if (this.videos[i].videoId == index) {
        this.videoToPlay = this.videos[i];
      }
    }
  }
  videoSelected(video: any) {
    console.log(video);
    this.videoToPlay = video;
    this.fileStrogeService.getFile(this.videoToPlay.videoFileID).then((res) => {
      if (res.code == "200") {
        this.videoSrcChanged = res.url_preview;
        this.videoPoster = res.url_thumbnail;
        this.videoSrc = this.videoSrcChanged;
        const player = this.elRef.nativeElement.querySelector('video');
        player.load();
        console.log(this.videoSrc);
        this.isLoading = false;
      }
    })
  }
}

