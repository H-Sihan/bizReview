import { Component } from '@angular/core';
import { BusinessData } from '../services/business-data';
import { RouterOutlet, RouterModule, RouterLink } from '@angular/router';
import { WebServices } from '../services/web-services';

@Component({
  selector: 'app-businesses',
  imports: [RouterOutlet,RouterModule],
  providers: [BusinessData,WebServices],
  templateUrl: './businesses.html',
  styleUrl: './businesses.css',
})
export class Businesses {
  business_list: any = [];
  page: number = 1;

  constructor(public businessData : BusinessData,
            public webService: WebServices ) { }

  ngOnInit() {
    if (sessionStorage['page']){
      this.page = Number(sessionStorage['page']);
    }
    this.webService.getBusinesses(this.page).subscribe(
      (response) => {this.business_list = response}
    )
    // this.business_list = this.businessData.getBusinesses(this.page);
  }

  previousPage(){
    if(this.page > 1){
      this.page = this.page - 1;
      //this.business_list = this.businessData.getBusinesses(this.page);
      this.webService.getBusinesses(this.page).subscribe(
        (response: any) => {
          this.business_list = response
        }
      )
      sessionStorage['page'] = this.page;
    }
  }

  nextPage() {
    if (this.page< this.businessData.getLastPageNumber()){
      this.page = this.page + 1;
      this.webService.getBusinesses(this.page).subscribe(
        (response: any) => {
          this.business_list = response
        }
      )
      //this.business_list = this.businessData.getBusinesses(this.page);
      sessionStorage['page'] = this.page;
    }
  }
}
