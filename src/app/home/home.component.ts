import { Component, OnInit } from '@angular/core';
import { HomeService } from './service/home.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { CountriesService } from '../countries/service/countries.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public covid19: any = {};
  public countryTopfive: any[] = [];
  public myDate = new Date();
  public updateDate = null;

  constructor(
    private homeService: HomeService,
    private countriesService: CountriesService,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.getCovidAll();
    this.getCountryAll();
  }

  getCovidAll() {
    this.covid19 = this.homeService.getCovidAll().subscribe((data: {}) => {
      this.covid19 = data;
    });
  }

  getCountryAll() {
    const countries = this.countriesService
      .getCovidAllCountries()
      .subscribe((data) => {
        data = data.sort((obj1, obj2) => {
          if (obj1.cases > obj2.cases) {
            return 1;
          }
          if (obj1.cases < obj2.cases) {
            return -1;
          }
          return 0;
        });
        this.sortCountrys(data.reverse());
        this.setTimeout();
      });
  }

  sortCountrys(data: any) {
    for (let i = 0; i < 3; i++) {
      this.countryTopfive.push(data[i]);
    }
    console.log(this.countryTopfive);
  }

  setTimeout() {
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
  }
}
