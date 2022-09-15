import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProtectedService } from '../../services/protected.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  subs: any = [];

  constructor(private router: Router, private protectedService: ProtectedService) { }

  ngOnInit(): void {
    this.protectedService.getSubs().subscribe( resp => {
      this.subs = resp;
      console.log(this.subs);
    }, (err) => {
      this.subs = [];
    });
  }

  deleteSub(id: string) {
    this.protectedService.deleteSub(id).subscribe( resp => {
      Swal.fire({
        icon: 'success',
        title: 'Action completed',
        showConfirmButton: false,
        timer: 1500
      });
      console.log(resp);
    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Action failed',
        showConfirmButton: false,
        timer: 1000
      });
    });
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        console.log(currentUrl);
    });
  }

}
