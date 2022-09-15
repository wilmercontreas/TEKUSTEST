import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProtectedService } from '../../services/protected.service';

@Component({
  selector: 'app-addsubs',
  templateUrl: './addsubs.component.html',
  styleUrls: ['./addsubs.component.css']
})
export class AddsubsComponent implements OnInit {

  // creation reactive form 
  form: FormGroup = this.fb.group({
    name: ['patata', [Validators.required] ],
    email: ['MrPotat0', [Validators.required]],
    countryCode: ['MrPotat0', [Validators.required]],
    countryName: ['MrPotat0', [Validators.required]],
    phoneCode: ['MrPotat0', [Validators.required]],
    phoneNumber: ['MrPotat0', [Validators.required]],
    jobTitle: ['MrPotat0', [Validators.required]],
    area: ['MrPotat0', [Validators.required]],
    topics: ['MrPotat0', [Validators.required]]
  });

  constructor(private fb: FormBuilder, 
    private router: Router, 
    private protectedService: ProtectedService){}

  ngOnInit(): void {}

  // show error message user input 
  get mnsgErrUserName(): string {
    if(this.form.controls['userName']?.errors?.['required']){
      return 'The user name is required'
    }
    return '';
  };

  // show error message password input 
  get mnsgErrpassword(): string {
    if(this.form.controls['password']?.errors?.['required']){
      return 'The password is required'
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
    topicsArr.push( this.form.value.topics);
    const body = {
      'Subscribers': [
        {
        'Name': this.form.value.name,
        "Email":  this.form.value.email,
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

    this.protectedService.addSubs(body).subscribe(ok => {
      // if ( ok.ok === true ) {
      //   Swal.fire({
      //     icon: 'success',
      //     title: 'Creado correctamente',
      //     showConfirmButton: false,
      //     timer: 1500
      //   });
      //   this.router.navigateByUrl('/dashboard');
      // } else {
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'Oops... no se realizo la accion',
      //     showConfirmButton: false,
      //     timer: 1500
      //   });
      // }
    });
  }

}
