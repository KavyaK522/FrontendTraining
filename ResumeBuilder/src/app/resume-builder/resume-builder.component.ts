import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-resume-builder',
  templateUrl: './resume-builder.component.html',
  styleUrls: ['./resume-builder.component.css']
})
export class ResumeBuilderComponent implements OnInit {
  resumeBuilderForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.resumeBuilderForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: '',
      professionalSummary: ['', [Validators.required]],
      academicSkills: ['', [Validators.required]],
      nonacademicSkills: ['', [Validators.required]],
      careerObjective: ['', [Validators.required]],
      Achievements: ['', [Validators.required]],
      tenthTitle: ['', [Validators.required]],
      twelthTitle: ['', [Validators.required]],
      degreeTitle: ['', [Validators.required]],
      experienceBlocks: this.formBuilder.array([this.buildExperienceBlock()])
    });
  }

  buildExperienceBlock(): FormGroup {
    console.log("hello");

    return this.formBuilder.group({
      title: ['', [Validators.required]],
      company: ['', [Validators.required]],
      location: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      description: ['', [Validators.required]]

    });
  }


  save() {
    console.log(this.resumeBuilderForm);
    console.log('Saved: ' + JSON.stringify(this.resumeBuilderForm.value));
    localStorage.setItem('dataSource',  JSON.stringify(this.resumeBuilderForm.value));
    //redirection to view resume
  }

  get experienceBlocks(): FormArray {
    return this.resumeBuilderForm.get('experienceBlocks') as FormArray;
  }

  addExperience() {

    this.experienceBlocks.insert(0, this.buildExperienceBlock());
    console.log(this.experienceBlocks.controls);
  }
}
