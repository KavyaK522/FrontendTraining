import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-resume',
  templateUrl: './view-resume.component.html',
  styleUrls: ['./view-resume.component.css']
})
export class ViewResumeComponent implements OnInit {

  constructor() { }
  resumeData!: any
  formData!:any|null
  ngOnInit(): void {
    const data = localStorage.getItem('dataSource')||"";
    this.resumeData= JSON.parse(data);
    console.log(this.resumeData);

  }

}
