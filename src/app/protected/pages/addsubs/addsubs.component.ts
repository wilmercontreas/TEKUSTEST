import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProtectedService } from '../../services/protected.service';
import { AddSubscribers } from '../../interfaces/protected';

@Component({
  selector: 'app-addsubs',
  templateUrl: './addsubs.component.html',
  styleUrls: ['./addsubs.component.css']
})
export class AddsubsComponent implements OnInit {

  // creation reactive form 
  form: FormGroup = this.fb.group({
    name: ['', [Validators.required] ],
    email: ['', [Validators.required, Validators.pattern(this.protectedService.validatorEmailPattern)]],
    countryCode: ['', [Validators.required]],
    countryName: ['', [Validators.required]],
    phoneCode: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
    jobTitle: ['', [Validators.required]],
    area: ['', [Validators.required]],
    topics: ['', []]
  });

  constructor(private fb: FormBuilder, 
    private router: Router, 
    private protectedService: ProtectedService){}

  ngOnInit(): void {}

  // show error message inputs
  get mnsgErrName(): string {
    if(this.form.controls['name']?.errors?.['required']){
      return 'The name is required'
    }
    return '';
  };
  get mnsgErrCountryCode(): string {
    if(this.form.controls['countryCode']?.errors?.['required']){
      return 'The Country Code is required'
    }
    return '';
  };
  get mnsgErrCountryName(): string {
    if(this.form.controls['countryName']?.errors?.['required']){
      return 'The country name is required'
    }
    return '';
  };
  get mnsgErrPhoneCode(): string {
    if(this.form.controls['phoneCode']?.errors?.['required']){
      return 'The Phone Code is required'
    }
    return '';
  };
  get mnsgErrPhoneNumber(): string {
    if(this.form.controls['phoneNumber']?.errors?.['required']){
      return 'The phone number is required'
    }
    return '';
  };
  get mnsgErrJobTitle(): string {
    if(this.form.controls['jobTitle']?.errors?.['required']){
      return 'The job title is required'
    }
    return '';
  };
  get mnsgErrArea(): string {
    if(this.form.controls['area']?.errors?.['required']){
      return 'The area is required'
    }
    return '';
  };
  // show error message email input 
  get mnsgErrEmail(): string {
    if(this.form.controls['email']?.errors?.['required']){
      return 'The email is required'
    } else if(this.form.controls['email']?.errors?.['pattern']){
      return 'Mail pattern invalid'
    }
    return '';
  };
  
  // show message error if inputs was touched and have errors
  invalidInput(campo: string) {
    return this.form.controls[campo].errors && this.form.controls[campo].touched;
  }
  
  // submit method
  addSub(){
    // invalid inputs in form
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      Swal.fire({
        icon: 'warning',
        title: 'Form invalid, fill the inputs',
        showConfirmButton: false,
        timer: 2000
      });
      return;
    }
    
    // call add sub service
    let topicsArr: any[] = [];
    if(this.form.value.topics) topicsArr.push(this.form.value.topics);
    const body:AddSubscribers = {
      "Subscribers": [
        {
        'Name': this.form.value.name,
        'Email':  this.form.value.email,
        'CountryCode':  this.form.value.countryCode,
        'CountryName':  this.form.value.countryName,
        'PhoneCode':  this.form.value.phoneCode,
        'PhoneNumber':  this.form.value.phoneNumber,
        'JobTitle':  this.form.value.jobTitle,
        'Area':  this.form.value.area,
        'Topics': topicsArr 
        }
      ]
    };
    console.log(body);
    this.protectedService.addSubs(body).subscribe({
      next: resp => {
        console.log(resp);
        Swal.fire({
          icon: 'success',
          title: 'Action completed',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigateByUrl('/dashboard');
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Action failed',
          showConfirmButton: false,
          timer: 1000
        });
      }
    });
  }

}
