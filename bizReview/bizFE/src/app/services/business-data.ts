import { Injectable } from '@angular/core';
import jsonData from '../assets/business.json';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BusinessData {

  pageSize: number = 3;

  constructor(private http: HttpClient ){ }

  getBusinesses(page: number) {
    let pageStart = (page - 1) * this.pageSize;
    let pageEnd = pageStart + this.pageSize; 
    return jsonData.slice(pageStart,pageEnd);
  }
  
  getLastPageNumber(){
    return Math.ceil(jsonData.length / this.pageSize);
  }

  getBusiness(id: any){
    let dataToReturn: any = [];
    jsonData.forEach(function(business){
      if (business._id.$oid == id){
        dataToReturn.push(business);
      }
    })
    return dataToReturn;
  }
  getLoremIpsum(paragraphs: number) : Observable<any> {
    let API_key = "vv+za+RgHsTXo8vvvL+nlw==9RyEkIgssHV93UmE";
    return this.http.get<any>(
      'https://api.api-ninjas.com/v1/' 
      + 'loremipsum?paragraphs=' + paragraphs,{headers:{'X-Api-key': API_key}}
    )
  }
}
