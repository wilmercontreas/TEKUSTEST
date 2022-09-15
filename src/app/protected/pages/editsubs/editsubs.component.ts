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

  //creacion del formulario reactivo 
  form: FormGroup = this.fb.group({
    name: ['', [Validators.required] ],
    alias: ['', [Validators.required]],
    power: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, 
    private router: Router, 
    private protectedService: ProtectedService,
    private activatedRoute: ActivatedRoute,){}

  ngOnInit(): void {
    this.cargarHeroe();
  }

  cargarHeroe(){
    this.activatedRoute.params.pipe(
      switchMap( params => {
        this.id = params['id'];
        return this.protectedService.getSubById(params['id']);
      })
    ).subscribe({
        next: resp => {
          if (!resp) {
            this.SubNotFound = true;
          }
          this.sub = resp;
          this.form.patchValue({
            name: this.sub.name,
            alias: this.sub.alias,
          });
        },
        error: () => this.SubNotFound = true
    });
  }

  // mostrar mensaje de error para el campo de name 
  get mnsgErrName(): string {
    if(this.form.controls['name']?.errors?.['required']){
      return 'El campo es obligatorio'
    }
    return '';
  };

  // mostrar mensaje de error para el campo de alias 
  get mnsgErrAlias(): string {
    if(this.form.controls['alias']?.errors?.['required']){
      return 'El campo es obligatorio'
    }
    return '';
  };

  // mostrar mensaje de error para el campo de power 
  get mnsgErrpower(): string {
    if(this.form.controls['power']?.errors?.['required']){
      return 'El campo es obligatorio'
    }
    return '';
  };

  // evaluar si campos del fomulario fueron tocados y son invalidos para mostrarmensage de error
  campoNoValido(campo: string) {
    return this.form.controls[campo].errors && this.form.controls[campo].touched;
  }
  
  // metodo submit del formulario
  updateSub(){
    // campos del formulario incorrecto
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
    let topicsArr: any [] = [];
    topicsArr.push(this.form.value.topics);
    const body = {
      id: this.id,
      ...this.form.value,
      topics: topicsArr
    };
    // llamado al servicio de crear
    this.protectedService.updateSub(body).subscribe(ok => {
      if ( ok === true ) {
        Swal.fire({
          icon: 'success',
          title: 'Action completed',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigateByUrl('/dashboard');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Action failed',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

}
