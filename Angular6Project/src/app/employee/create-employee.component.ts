import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, RequiredValidator, AbstractControl } from '@angular/forms';
import { CustomValidators } from '../shared/custom.validators';
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
    'required' : 'Email is required.',
    'emailDomain' : 'Email domain should be orthofx.com'
   },
   'phone' : {
    'required' : 'Phone is required.'
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
    'fullName' : '',
    'email' : '',
    'phone' : '',
    'skillName' : '',
    'experienceInYears' : '',
    'proficiency' : ''
  };
  constructor(private fb: FormBuilder) { }

  ngOnInit(){
    this.employeeForm = this.fb.group({
    fullName: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
    contactPreference: ['email'],
    email: ['', [Validators.required, CustomValidators.emailDomain('orthofx.com')]],
    phone: ['',Validators.required],
    skills: this.fb.group({
      skillName: ['', Validators.required],
      experienceInYears: ['', Validators.required],
      proficiency: ['', Validators.required]
    })
    });

    this.employeeForm.get('contactPreference')?.valueChanges.subscribe((data: string) => {
      this.logValidationErrors(this.employeeForm);
    });


    this.employeeForm.valueChanges.subscribe((data) =>{
      this.logValidationErrors(this.employeeForm);
    });
  }

  onContactPreferenceChange(selectedValue: string){
    const phoneControl = this.employeeForm.get('phone');
    if (selectedValue === 'phone'){
      phoneControl?.setValidators(Validators.required);
    } else {
      phoneControl?.clearValidators();
    }
    phoneControl?.updateValueAndValidity();
  }
  logValidationErrors(group: FormGroup = this.employeeForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if(abstractControl instanceof FormGroup){
        this.logValidationErrors(abstractControl);
      } else {
        (this.formErrors as any)[key] = '';
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
          const messages = (this.validationMessages as any)[key];
          console.log(messages);
          for (const errorKey in abstractControl.errors){
            if (errorKey) {
              (this.formErrors as any)[key] += messages[errorKey] + ' ';
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
  //  this.logValidationErrors(this.employeeForm);
  //  console.log(this.formErrors);
  }

}


