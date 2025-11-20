import { Component } from '@angular/core';
import { BusinessData } from '../../services/business-data';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-business',
  imports: [RouterLink, CommonModule, GoogleMapsModule],
  templateUrl: './business.html',
  styleUrl: './business.css',
})
export class Business {
  business_list: any = [];
  business_lat: any;
  business_lng: any;
  map_options: google.maps.MapOptions = { };
  map_locations: any[] = [ ]


  constructor (private route: ActivatedRoute,
               private businessData: BusinessData) { }

  ngOnInit(){
    this.business_list = this.businessData.getBusiness(
        this.route.snapshot.paramMap.get('id'))
        this.business_lat = this.business_list[0].location.coordinates[0];
        this.business_lng = this.business_list[0].location.coordinates[1];

        this.map_options = {
          mapId:"Demo",
          center: {lat: this.business_lat,
                   lng: this.business_lng},
          zoom: 13
        };
  }
}
