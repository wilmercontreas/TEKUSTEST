import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscriber } from '../../interfaces/protected';
import { ProtectedService } from '../../services/protected.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  subs: Subscriber[] = [];

  constructor(private router: Router, private protectedService: ProtectedService) { }

  ngOnInit(): void {
    // call get all subs service and save data on array
    this.protectedService.getSubs().subscribe({
      next: resp => {
        this.subs = resp || [] ;
      },
      error: () => this.subs = []
    });
  }

  // delete sub method 
  deleteSub(id: number) {
    // call delete sub service and show modal according backend response
    this.protectedService.deleteSub(id.toString()).subscribe({
      next: resp => {
        Swal.fire({
          icon: 'success',
          title: 'Action completed',
          showConfirmButton: false,
          timer: 1500
        });
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
    // reload page after deleted 
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

}
