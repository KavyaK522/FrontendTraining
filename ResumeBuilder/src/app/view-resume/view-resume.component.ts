import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-resume',
  templateUrl: './view-resume.component.html',
  styleUrls: ['./view-resume.component.css']
})
export class ViewResumeComponent implements OnInit {

  constructor() { }
  resumeData: String | undefined
  ngOnInit(): void {
    const data = localStorage.getItem('dataSource')
    this.resumeData = data != null ? data: " "
  }

}
