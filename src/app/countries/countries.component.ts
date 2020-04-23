import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { CountriesService } from './service/countries.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
})
export class CountriesComponent implements OnInit {
  faSearch = faSearch;
  public countries: any[] = [];
  public countriesMaster: any[] = [];
  public country: string = null;
  public currentPage = 0;
  public logo = 'assets/image/covidthai.png';

  displayedColumns: string[] = [
    'rank',
    'country',
    'cases',
    'todayCases',
    'deaths',
    'todayDeaths',
    'recovered',
    'active',
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private countriesService: CountriesService,
    private spinner: NgxSpinnerService
  ) {
    this.spinner.show();
    this.getAllCountries();
  }

  ngOnInit(): void {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllCountries() {
    if (this.country === null || this.country === '') {
      this.countriesService.getCovidAllCountries().subscribe((data: []) => {
        data = this.sortDescending(data);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
        this.spinner.hide();
      });
  }

  sortDescending(data: any) {
    data = data.sort((obj1, obj2) => {
      if (obj1.cases > obj2.cases) {
        return 1;
      }
      if (obj1.cases < obj2.cases) {
        return -1;
      }
      return 0;
    });
    return data.reverse();
  }
}
