import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, RequiredValidator, AbstractControl, FormControl, FormArray } from '@angular/forms';
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
   'confirmEmail' : {
    'required' : 'ConfirmEmail is required.'
    // 'emailDomain' : 'Email domain should be orthofx.com'
   },
   'emailGroup': {
    'emailMismatch': 'Email and Confirm Email do not match'
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
    'required' : 'Proficiency is required'
   },
  };

  formErrors = {
    'fullName' : '',
    'email' : '',
    'confirmEmail' : '',
    'emailGroup': '',
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
    emailGroup: this.fb.group({
      email: ['', [Validators.required, CustomValidators.emailDomain('orthofx.com')]],
      confirmEmail: ['', Validators.required]}, {validators: matchEmail}),

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
      if(abstractControl instanceof FormGroup){
        this.logValidationErrors(abstractControl);
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
  const formArray = new FormArray([
    new FormControl('John', Validators.required),
    new FormGroup({
      country: new FormControl('', Validators.required)
    }),
    new FormArray([])
  ]);
  console.log(formArray.length);
  for(const control of formArray.controls){
    if(control instanceof FormControl) {
      console.log('Control is FormControl');
  }
  if(control instanceof FormGroup) {
    console.log('control is FormGroup')
  }
  }
}



function matchEmail(group: AbstractControl): {[key:string]: any} | null{
  const emailControl = group.get('email');
  const confirmEmailControl = group.get('confirmEmail');

  if(emailControl?.value === confirmEmailControl?.value || confirmEmailControl?.pristine){
    return null;
  } else{
    return{'emailMismatch': true};
  }
}


