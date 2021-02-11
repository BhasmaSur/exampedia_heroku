import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserSignupComponent } from './components/user-signup/user-signup.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AddExamComponent } from './components/add-exam/add-exam.component';
import { AddedSuccessfullyComponent } from './components/added-successfully/added-successfully.component';
import { CoachingEditComponent } from './components/coaching-edit/coaching-edit.component';
import { CoachingLoginComponent } from './components/coaching-login/coaching-login.component';
import { CoachingProfileComponent } from './components/coaching-profile/coaching-profile.component';
import { CoachingSignupComponent } from './components/coaching-signup/coaching-signup.component';
import { ExamOverComponent } from './components/exam-over/exam-over.component';
import { ExamPaperComponent } from './components/exam-paper/exam-paper.component';
import { ExamWelcomeComponent } from './components/exam-welcome/exam-welcome.component';
import { PdfGalleryComponent } from './components/pdf-gallery/pdf-gallery.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { TestComponent } from './components/test/test.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { VideoGalleryComponent } from './components/video-gallery/video-gallery.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { coachingsResolver } from './resolvers/coachings-resolver';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { UserGuardGuard } from './guards/user-guard.guard';
import { CoachingProfileGuardGuard } from './guards/coaching-profile-guard.guard';
import { CoachingPreviewComponent } from './components/coaching-preview/coaching-preview.component';

const routes: Routes = [
  {
    path:'',
    component: TestComponent,
    // resolve:{
    //   coaching:coachingsResolver
    // }
  },
  {
    path:'pdf-gallery',
    component: PdfGalleryComponent,
    canActivate:[UserGuardGuard]
    
  },
  {
    path:'coaching-signup',
    component: CoachingSignupComponent
  },
  {
    path:'video-gallery',
    component: VideoGalleryComponent,
    canActivate:[UserGuardGuard]
  },
  {
    path:'login',
    component: UserLoginComponent,
    
  },
  {
    path:'coaching-login',
    component: CoachingLoginComponent
  },
  {
    path:'profile',
    component: UserProfileComponent,
    resolve:{
      coaching:coachingsResolver
    },
    canActivate:[UserGuardGuard]
  },
  {
    path:'edit',
    component: ProfileEditComponent,
    resolve:{
      coaching:coachingsResolver
    },
    canActivate:[UserGuardGuard]
  },
  {
    path:'coaching-edit',
    component: CoachingEditComponent,
    resolve:{
      coaching:coachingsResolver
    },
    canActivate:[CoachingProfileGuardGuard]
  },
  {
    path:'coaching/:id',
    component: CoachingProfileComponent,
    resolve:{
      coaching:coachingsResolver
    }
  },
  {
    path:'test',
    component: TestComponent
  },
  {
    path:'exam-welcome',
    component: ExamWelcomeComponent,
    canActivate:[UserGuardGuard]
  },
  
  {
    path:'exam-over',
    component: ExamOverComponent,
    canActivate:[UserGuardGuard]
  },
  {
    path:'exam-paper',
    component: ExamPaperComponent,
    canActivate:[UserGuardGuard]
  },
  {
    path:'add-exam',
    component: AddExamComponent,
    canActivate:[CoachingProfileGuardGuard]
  },
  {
    path:'success',
    component: AddedSuccessfullyComponent
  },
  {
    path:'add-course',
    component: AddCourseComponent,
    canActivate:[CoachingProfileGuardGuard]
  },
  {
    path:'signup',
    component: UserSignupComponent
  },
  {
    path:'coaching-preview',
    component: CoachingPreviewComponent
  },
  {
    path:'**',
    component: NotfoundComponent
  },
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
