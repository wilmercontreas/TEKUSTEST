import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginResponse, User } from '../interfaces/auth';
import { catchError, map, of, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public validatorEmailPattern : string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  private api: string = environment.api;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  logIn(body: User){
    const endPoint = `${this.api}/account/login`;
    // login request and set token in local storage 
    return this.http.post<LoginResponse>(endPoint, body).pipe(
      tap( resp => {
        if ( resp.Token ) {
          localStorage.setItem('jwtokken', resp.Token!);
        }
      }),
      catchError( err => of(err.error.error) )
    );

  }

  jwtValid(): boolean{
    // get token of local storage and chek if valid or no expider 
    const jwt = localStorage.getItem('jwtokken') || '';
    if(!localStorage.getItem('jwtokken') || this.jwtHelper.isTokenExpired(jwt)){
      return false
    }
    return true;
  }

  // remove token from local storage 
  logOut(){
    localStorage.removeItem('jwtokken');
  }

}
