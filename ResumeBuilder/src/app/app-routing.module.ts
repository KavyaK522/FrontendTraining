import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumeBuilderComponent } from './resume-builder/resume-builder.component';
import { ViewResumeComponent } from './view-resume/view-resume.component';

const appRoutes: Routes = [
  { path: 'build', component: ResumeBuilderComponent },
  { path: 'view', component: ViewResumeComponent },
  { path: '', redirectTo: '/build', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [ RouterModule]
})
export class AppRoutingModule { }

