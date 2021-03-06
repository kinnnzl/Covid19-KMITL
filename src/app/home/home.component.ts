import { Component, OnInit } from '@angular/core';
import { HomeService } from './service/home.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CountriesService } from '../countries/service/countries.service';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Meta, Title } from '@angular/platform-browser';

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
  public visitors: any[];
  public count: number;
  public status = 'initial';
  faEye = faEye;

  constructor(
    private homeService: HomeService,
    private countriesService: CountriesService,
    private spinner: NgxSpinnerService,
    private meta: Meta,
    private title: Title
  ) {
    meta.addTags([
      {
        name: 'description',
        content: 'This is my Angular SEO-based App, enjoy it!',
      },
      {
        name: 'image',
        content: 'https://raw.githubusercontent.com/kinnnzl/Covid19-KMITL/master/src/app/core/image/%E0%B9%84%E0%B8%A7%E0%B8%A3%E0%B8%B1%E0%B8%AA.png'
      }
    ]);
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getVisitors();
    this.getCovidAll();
    this.getCountryAll();
  }

  getCovidAll() {
    this.covid19 = this.homeService.getCovidAll().subscribe((data: {}) => {
      this.covid19 = data;
    });
  }

  getCountryAll() {
    this.countriesService.getCovidAllCountries().subscribe((data) => {
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
      this.spinner.hide();
    });
  }

  sortCountrys(data: any) {
    for (let i = 0; i < 3; i++) {
      this.countryTopfive.push(data[i]);
    }
  }

  getVisitors() {
    this.homeService.getVisitors().subscribe((items) => {
      this.visitors = items;
      this.count = this.visitors[0].value;
      this.updateVisitors();
    });
  }

  updateVisitors() {
    this.homeService.updateVisitors(
      this.visitors[0].key,
      this.visitors[0].value,
      this.status
    );
    this.status = 'SuccessSetVisitor';
  }
}
