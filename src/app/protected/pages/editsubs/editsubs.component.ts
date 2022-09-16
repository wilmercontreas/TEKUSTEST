import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { ProtectedService } from '../../services/protected.service';

@Component({
  selector: 'app-editsubs',
  templateUrl: './editsubs.component.html',
  styleUrls: ['./editsubs.component.css']
})
export class EditsubsComponent implements OnInit {

  sub: any = {};
  id: string = ""; 
  SubNotFound: boolean = false;

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required] ],
    email: ['', [Validators.required, Validators.pattern(this.protectedService.validatorEmailPattern)]],
    countryCode: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
    jobTitle: ['', [Validators.required]],
    area: ['', [Validators.required]],
    topics: ['', []]
  });

  constructor(private fb: FormBuilder, 
    private router: Router, 
    private protectedService: ProtectedService,
    private activatedRoute: ActivatedRoute,){}

  ngOnInit(): void {
    this.loadSub();
  }

  get mnsgErrName(): string {
    if(this.form.controls['name']?.errors?.['required']){
      return 'The name is required'
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
  get mnsgErrCountryCode(): string {
    if(this.form.controls['countryCode']?.errors?.['required']){
      return 'The Country Code is required'
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
  
  invalidInput(campo: string) {
    return this.form.controls[campo].errors && this.form.controls[campo].touched;
  }

  loadSub(){
    this.activatedRoute.params.pipe(
      switchMap( params => {
        this.id = params['id'];
        return this.protectedService.getSubById(params['id']);
      })
    ).subscribe({
        next: resp => {
          console.log(resp);
          if (!resp) {
            this.SubNotFound = true;
          }
          this.sub = resp;
          this.form.patchValue({
            name: this.sub.Name,
            email: this.sub.Email,
            countryCode: this.sub.CountryCode,
            phoneNumber: this.sub.PhoneNumber,
            jobTitle: this.sub.JobTitle,
            area: this.sub.Area,
            topics: this.sub.Topics[0]
          });
        },
        error: () => this.SubNotFound = true
    });
  }

  updateSub(){
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
    let topicsArr: any[] = [];
    if(this.form.value.topics) topicsArr.push(this.form.value.topics);
    const body = {
      Id: this.id,
      Name: this.form.value.name,
      Email: this.form.value.email,
      CountryCode: this.form.value.countryCode,
      PhoneNumber: this.form.value.phoneNumber,
      JobTitle: this.form.value.jobTitle,
      Area: this.form.value.area,
      Topics: topicsArr
    };
    console.log(body);
    this.protectedService.updateSub(body).subscribe({
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
