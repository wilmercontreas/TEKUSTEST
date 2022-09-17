import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProtectedService } from '../../services/protected.service';
import { AddSubscribers, Countries } from '../../interfaces/protected';

@Component({
  selector: 'app-addsubs',
  templateUrl: './addsubs.component.html',
  styleUrls: ['./addsubs.component.css']
})
export class AddsubsComponent implements OnInit {

  countries: Countries[] = [];
  selectedCountry: Countries = {};

  // creation reactive form 
  form: FormGroup = this.fb.group({
    name: ['', [Validators.required] ],
    email: ['', [Validators.required, Validators.pattern(this.protectedService.validatorEmailPattern)]],
    country: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
    jobTitle: ['', [Validators.required]],
    area: ['', [Validators.required]],
    topics: ['', []]
  });

  constructor(private fb: FormBuilder, 
    private router: Router, 
    private protectedService: ProtectedService){}

  ngOnInit(): void {
    // call countries service to sow on select form 
    this.protectedService.getCountries().subscribe({
      next: resp => {
        if (!resp) {
          this.countries = [];
        }
        this.countries = resp!;
      },
      error: () => this.countries = []
    })
  }

  // error message inputs invalid
  get mnsgErrName(): string {
    if(this.form.controls['name']?.errors?.['required']){
      return 'The name is required'
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
  get mnsgErrCountry(): string {
    if(this.form.controls['country']?.errors?.['required']){
      return 'The country is required'
    }
    return '';
  };
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
    //show error modal if inputs are invalid after submit
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
    // serch countrycode, phonecode on selected country on select 
    this.selectedCountry = this.countries.find(item => item.Code == this.form.value.country)!;
    // perepare payload to send on body service
    let topicsArr: any[] = [];
    if(this.form.value.topics) topicsArr.push(this.form.value.topics);
    const body:AddSubscribers = {
      "Subscribers": [
        {
        'Name': this.form.value.name,
        'Email':  this.form.value.email,
        'CountryCode': this.selectedCountry.Code,
        'CountryName':  this.selectedCountry.Name,
        'PhoneCode':  this.selectedCountry.PhoneCode!,
        'PhoneNumber':  this.form.value.phoneNumber,
        'JobTitle':  this.form.value.jobTitle,
        'Area':  this.form.value.area,
        'Topics': topicsArr 
        }
      ]
    };
    // call add sub service and show modal according backend response
    this.protectedService.addSubs(body).subscribe({
      next: resp => {
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
