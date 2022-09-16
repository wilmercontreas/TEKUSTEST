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
    this.protectedService.getSubs().subscribe({
      next: resp => {
        this.subs = resp || [] ;
        console.log(this.subs);
      },
      error: () => this.subs = []
    });
  }

  deleteSub(id: number) {
    this.protectedService.deleteSub(id.toString()).subscribe({
      next: resp => {
        console.log(resp);
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
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

}
