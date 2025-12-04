import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WebService {

  constructor(private http: HttpClient) { }

  pageSize: number = 3

  getBusinesses(page: number){
    return this.http.get<any>(
      'http://127.0.0.1:5000/businesses?pn'+
      page + '&ps=' + this.pageSize
    );
  }

  getBusiness(id: any){
    return this.http.get<any>(
      'http://127.0.0.1:5000/businesses/'+ id);
  }
  
}
