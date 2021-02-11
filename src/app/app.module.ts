import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { TestComponent } from './components/test/test.component';
import { MarketNavbarComponent } from './components/market-navbar/market-navbar.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemBoxComponent } from './components/item-box/item-box.component';
import { TagsComponent } from './components/tags/tags.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MarketFooterComponent } from './components/market-footer/market-footer.component';
import { CoachingProfileComponent } from './components/coaching-profile/coaching-profile.component';
import { CoachingFooterComponent } from './components/coaching-footer/coaching-footer.component';
import { CoachingNavbarComponent } from './components/coaching-navbar/coaching-navbar.component';
import { CoachingItemComponent } from './components/coaching-item/coaching-item.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { CoachingLoginComponent } from './components/coaching-login/coaching-login.component';
import { CoachingEditComponent } from './components/coaching-edit/coaching-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { PageLoadingComponent } from './components/page-loading/page-loading.component';
import { VideoGalleryComponent } from './components/video-gallery/video-gallery.component';
import { PdfGalleryComponent } from './components/pdf-gallery/pdf-gallery.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { coachingsResolver } from './resolvers/coachings-resolver';
import { ExamWelcomeComponent } from './components/exam-welcome/exam-welcome.component';
import { ExamPaperComponent } from './components/exam-paper/exam-paper.component';
import { CountdownModule } from 'ngx-countdown';
import { ExamOverComponent } from './components/exam-over/exam-over.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AddExamComponent } from './components/add-exam/add-exam.component';
import { AddVideoComponent } from './components/add-video/add-video.component';
import { AddPdfComponent } from './components/add-pdf/add-pdf.component';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatGridListModule} from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFileUploadModule } from 'mat-file-upload';
import { MatCardModule } from '@angular/material/card';
import { AddedSuccessfullyComponent } from './components/added-successfully/added-successfully.component';
import { CoachingSignupComponent } from './components/coaching-signup/coaching-signup.component';
import { UserSignupComponent } from './components/user-signup/user-signup.component';
import { CoachingPreviewComponent } from './components/coaching-preview/coaching-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NotfoundComponent,
    TestComponent,
    MarketNavbarComponent,
    ItemBoxComponent,
    TagsComponent,
    SearchBarComponent,
    MarketFooterComponent,
    CoachingProfileComponent,
    CoachingFooterComponent,
    CoachingNavbarComponent,
    CoachingItemComponent,
    UserProfileComponent,
    UserLoginComponent,
    ProfileEditComponent,
    CoachingLoginComponent,
    CoachingEditComponent,
    PageLoadingComponent,
    VideoGalleryComponent,
    PdfGalleryComponent,
    ExamWelcomeComponent,
    ExamPaperComponent,
    ExamOverComponent,
    AddCourseComponent,
    AddExamComponent,
    AddVideoComponent,
    AddPdfComponent,
    AddedSuccessfullyComponent,
    CoachingSignupComponent,
    UserSignupComponent,
    CoachingPreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    PdfViewerModule,
    ReactiveFormsModule,
    CountdownModule,
    MatButtonModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,   
    MatIconModule,
    MatSelectModule,
    MatFileUploadModule ,
    MatCardModule
  ],
  providers: [coachingsResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
