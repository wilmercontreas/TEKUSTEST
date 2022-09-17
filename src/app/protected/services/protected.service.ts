import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AddSubscribers, AddSubscribersResponse, DeleteSubscriberResponse, GetCountriesResponse, GetSubscribersResponse, Subscriber, UpdateSubscribersResponse } from '../interfaces/protected';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProtectedService {

  constructor(private http: HttpClient ) { }

  // get api from environment
  private api: string = environment.api;
  //create pattern to validate on email inputs forms
  public validatorEmailPattern : string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  getSubs() {
    // send auth token on header 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('jwtokken') || ''}`);
    const endPoint = `${this.api}/subscribers`;
    // list all subscribers request and show only data response 
    return this.http.get<GetSubscribersResponse>(endPoint, {headers}).pipe(
      map( resp => resp.Data ),
    );
  }

  getSubById( id: string ) {
    // send auth token on header 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('jwtokken') || ''}`);
    const endPoint = `${this.api}/subscribers/${id}`;
    // list one subscriber request 
    return this.http.get<Subscriber>(endPoint, {headers});
  }

  addSubs( body: AddSubscribers ) {
    // send auth token on header 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('jwtokken') || ''}`);
    const endPoint = `${this.api}/subscribers`;
    // add subscribers 
    return this.http.post<AddSubscribersResponse>(endPoint, body, {headers});
  }

  updateSub( body: Subscriber ) {
    // send auth token on header 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('jwtokken') || ''}`);
    const endPoint = `${this.api}/subscribers/${body.Id}`;
    // update subscriber request
    return this.http.put<UpdateSubscribersResponse>(endPoint, body, {headers});
  }

  deleteSub( id: string ) {
    // send auth token on header 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('jwtokken') || ''}`);
    const endPoint = `${this.api}/subscribers/${id}`;
    // delete subscriber request 
    return this.http.delete<DeleteSubscriberResponse>(endPoint, {headers});
  }

  getCountries() {
    // send auth token on header 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('jwtokken') || ''}`);
    const endPoint = `${this.api}/countries?count=230&sortType=0`;
    // list all countries request and show only data response 
    return this.http.get<GetCountriesResponse>(endPoint, {headers}).pipe(
      map( resp => resp.Data ),
    );
  }
  
}
