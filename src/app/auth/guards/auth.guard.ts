import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // call service to check jwt
    const loggedIn = this.authService.jwtValid();
    // sow err modal if user is not logged 
    if (!loggedIn) {
      Swal.fire({
        icon: 'error',
        title: 'please sign in to see this page',
        showConfirmButton: false,
        timer: 1000
      });
      this.router.navigateByUrl('/auth/login');
      return false;
    }
    return true;
  }

  canLoad(): boolean {
    // call service to check jwt
    const loggedIn = this.authService.jwtValid();
    // sow err modal if user is not logged 
    if (!loggedIn) {
      Swal.fire({
        icon: 'error',
        title: 'please sign in to see this page',
        showConfirmButton: false,
        timer: 1000
      });
      this.router.navigateByUrl('/auth/login');
      return false;
    }
    return true;
  }
  
}
