import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
   employeeForm!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(){
    this.employeeForm = this.fb.group({
    fullName: [''],
    email: [''],
    skills: this.fb.group({
      skillName: [''],
      experienceInYears: [''],
      proficiency: ['beginner']
    })
    });
  }

  onSubmit(): void {
    console.log(this.employeeForm.touched);
    console.log(this.employeeForm.value);

    console.log(this.employeeForm.controls['fullName'].touched);
    console.log(this.employeeForm.get('fullName')?.value);

  }
  onLoadDataClick(): void{
   this.employeeForm.patchValue({
    fullName: 'Kavya',
    email: 'kavyak@gmail.com',
    skills: {
      skillName: 'C#',
      experienceInYears: 5,
      proficiency: 'beginner'
    }
   });
  }

}
