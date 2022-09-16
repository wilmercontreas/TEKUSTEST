import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AddSubscribersResponse, DeleteSubscriberResponse, GetSubscribersResponse, Subscriber, UpdateSubscribersResponse } from '../interfaces/protected';
import { catchError, map, Observable, of, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProtectedService {

  constructor(private http: HttpClient ) { }

  private api: string = environment.api;
  public validatorEmailPattern : string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  getSubs() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('jwtokken') || ''}`);
    const endPoint = `${this.api}/subscribers`;
    return this.http.get<GetSubscribersResponse>(endPoint, {headers}).pipe(
      map( resp => resp.Data ),
    );
  }

  getSubById( id: string ) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('jwtokken') || ''}`);
    const endPoint = `${this.api}/subscribers/${id}`;
    return this.http.get<Subscriber>(endPoint, {headers});
  }

  // TODO: CAMBIAR EL BODY
  addSubs( body: any ) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('jwtokken') || ''}`);
    const endPoint = `${this.api}/subscribers`;
    return this.http.post<AddSubscribersResponse>(endPoint, body, {headers});
  }

  updateSub( body: any ) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('jwtokken') || ''}`);
    const endPoint = `${this.api}/subscribers/${body.Id}`;
    return this.http.put<UpdateSubscribersResponse>(endPoint, body, {headers});
  }

  deleteSub( id: string ) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('jwtokken') || ''}`);
    const endPoint = `${this.api}/subscribers/${id}`;
    return this.http.delete<DeleteSubscriberResponse>(endPoint, {headers});
  }
  
}
