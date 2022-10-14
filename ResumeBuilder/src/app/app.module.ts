import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResumeBuilderComponent } from './resume-builder/resume-builder.component';
import { ViewResumeComponent } from './view-resume/view-resume.component';

@NgModule({
  declarations: [
    AppComponent,
    ResumeBuilderComponent,
    ViewResumeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
