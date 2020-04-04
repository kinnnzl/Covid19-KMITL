import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { CountriesService } from './service/countries.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
})
export class CountriesComponent implements OnInit {
  faSearch = faSearch;
  public countries: any[] = [];
  public country: string = null;

  constructor(
    private countriesService: CountriesService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getAllCountries();
  }

  getAllCountries() {
    if (this.country === null || this.country === '') {
      this.spinner.show();
      this.countriesService.getCovidAllCountries().subscribe((data: []) => {
        this.countries = [];
        this.countries = data;
        console.log(this.countries);
        this.spinner.hide();
      });
    }
  }

  search() {
    this.spinner.show();
    this.countriesService
      .getBySearchCountry(this.country)
      .subscribe((data: []) => {
        this.countries = [];
        this.countries.push(data);
        console.log(this.countries);
        this.spinner.hide();
      });
  }
}
