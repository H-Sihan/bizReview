import { Component } from '@angular/core';
import { BusinessData } from '../../services/business-data';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-business',
  imports: [RouterLink],
  templateUrl: './business.html',
  styleUrl: './business.css',
})
export class Business {
  business_list: any = [];
  constructor (private route: ActivatedRoute,
               private businessData: BusinessData) { }

  ngOnInit(){
    this.business_list = this.businessData.getBusiness(
        this.route.snapshot.paramMap.get('id'));
  }
}
