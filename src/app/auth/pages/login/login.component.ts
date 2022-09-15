import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // creation reactive form 
  form: FormGroup = this.fb.group({
    userName: ['patata', [Validators.required] ],
    password: ['MrPotat0', [Validators.required]]
  });

  constructor(private fb: FormBuilder, 
    private router: Router, 
    private authService: AuthService){}

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
  login(){
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
    
    // call login service\
    this.authService.logIn(this.form.value).subscribe(resp => {
      if ( resp.Status === 1 ) {
        this.router.navigateByUrl('/dashboard');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: resp
        });
      }
    });
  }

}
