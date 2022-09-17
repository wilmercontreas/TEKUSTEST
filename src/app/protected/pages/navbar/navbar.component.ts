import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService ) { }

  ngOnInit(): void {
  }

  // logout sub method 
  logout() {
    // call log out service 
    this.authService.logOut();
    // redirect to login page after logout 
    this.router.navigateByUrl('/auth/login');
  }

}
