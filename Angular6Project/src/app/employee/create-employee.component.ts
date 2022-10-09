import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
   employeeForm!: FormGroup;
   validationMessages = {
    'fullName' : {
    'required' : 'Full Name is required.',
    'minLength' : 'Full Name must be greater than 2 characters.',
    'maxLength' : 'Full Name must be less than 10 characters.'
   },
   'email' : {
    'required' : 'Email is required.'
   },
   'skillName' : {
    'required' : 'Skill Name is required.'
   },
   'experienceInYears' : {
    'required' : 'Experience is required'
   },
   'proficiency' : {
    'required' : 'Proficiency os required'
   },
  };

  formErrors = {
    'fullNAme' : '',
    'email' : '',
    'skillName' : '',
    'experienceInYears' : '',
    'proficiency' : ''
  };
  constructor(private fb: FormBuilder) { }

  ngOnInit(){
    this.employeeForm = this.fb.group({
    fullName: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
    email: ['', Validators.required],
    skills: this.fb.group({
      skillName: ['', Validators.required],
      experienceInYears: ['', Validators.required],
      proficiency: ['', Validators.required]
    })
    });
  }
  logValidationErrors(group: FormGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if(abstractControl instanceof FormGroup){
        this.logValidationErrors(abstractControl);
      } else {
        this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid) {
          const messages = this.validationMessages[key];
          console.log(messages);
          for (const errorKey in abstractControl.errors){
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    });
  }

  onSubmit(): void {
    console.log(this.employeeForm.touched);
    console.log(this.employeeForm.value);

    console.log(this.employeeForm.controls['fullName'].touched);
    console.log(this.employeeForm.get('fullName')?.value);

  }
  onLoadDataClick(): void{
   this.logValidationErrors(this.employeeForm);
   console.log(this.formErrors);
  }

}
