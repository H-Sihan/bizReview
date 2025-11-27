import { Component } from '@angular/core';
import { BusinessData } from '../../services/business-data';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { WebServices } from '../../services/web-services';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-business',
  imports: [RouterLink, CommonModule, GoogleMapsModule, ReactiveFormsModule],
  providers: [WebServices],
  templateUrl: './business.html',
  styleUrl: './business.css',
})
export class Business {
  business_list: any = [];
  business_lat: any;
  business_lng: any;
  map_options: google.maps.MapOptions = {};
  map_locations: any[] = []
  loremIpsum: any;

  reviews_list: any;
  reviewForm: any;


  constructor(private route: ActivatedRoute,
    private businessData: BusinessData,
    private webService: WebServices,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.reviewForm = this.formBuilder.group({
      username: ['', Validators.required],
      comment: ['', Validators.required],
      stars: 5
    });
    this.webService.getBusiness(this.route.snapshot.paramMap.get('id'))
      .subscribe((response) => {
        this.business_list = [response];
        this.business_lat = this.business_list[0].location.coordinates[0];
        this.business_lng = this.business_list[0].location.coordinates[1];

        this.map_locations.push({
          lat: this.business_lat,
          lng: this.business_lng
        });

        this.map_options = {
          mapId: "DEMO_MAP_ID",
          center: {
            lat: this.business_lat,
            lng: this.business_lng
          },
          zoom: 13
        };

        this.webService.getLoremIpsum(1)
          .subscribe((response: any) => {
            this.loremIpsum = response.text.slice(0, 600);
          });




      });

    this.webService.getReviews(
      this.route.snapshot.paramMap.get('id'))
      .subscribe((response) => {
        this.reviews_list = response;
      });


    /*this.business_list = this.dataService.getBusiness(
        this.route.snapshot.paramMap.get('id')

        this.webService.getReviews(
                this.route.snapshot.paramMap.get('id'))
                .subscribe((response) => {
                    this.review_list = response;
                });
    );*/
    //for maps only

  }

  onSubmit() {
    this.webService.postReview(
      this.route.snapshot.paramMap.get('id'),
      this.reviewForm.value)
      .subscribe((response) => {
        this.reviewForm.reset();

        this.webService.getReviews(
          this.route.snapshot.paramMap.get('id'))
          .subscribe((response) => {
            this.reviews_list = response;
          });
      })
  };

  isInvalid(control: any) {
    return this.reviewForm.controls[control].invalid &&
      this.reviewForm.controls[control].touched;
  };

  isUntouched() {
    return this.reviewForm.controls.username.pristine &&
      this.reviewForm.controls.comment.pristine;
  }
}
