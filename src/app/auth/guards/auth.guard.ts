import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const loggedIn = this.authService.jwtValid();
    if (!loggedIn) {
      this.router.navigateByUrl('/auth/login');
      return false;
    }
    return true;
  }

  canLoad(): boolean {
    const loggedIn = this.authService.jwtValid();
    if (!loggedIn) {
      this.router.navigateByUrl('/auth/login');
      return false;
    }
    return true;
  }
  
}
