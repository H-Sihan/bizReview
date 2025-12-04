import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  isLoggedIn$ = new BehaviorSubject<boolean>(false);
  currentUser$ = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const basicToken = btoa(`${username}:${password}`)

    const headers = new HttpHeaders({
      Authorization: `Basic ${basicToken}`
    });

    return this.http.get('http://127.0.0.1:5000/login', {headers});
  }

  logout(token: string){
    const headers = new HttpHeaders({
      'x-access-token':token
    });

    return this.http.get('http://127.0.0.1:5000/logout', {headers});
  }

  //Helpers
  setLoginState(username: string){
    this.isLoggedIn$.next(true);
    this.currentUser$.next(username);
  }
  
  clearLoginState(){
    this.isLoggedIn$.next(false);
    this.currentUser$.next(null);
  }
}
