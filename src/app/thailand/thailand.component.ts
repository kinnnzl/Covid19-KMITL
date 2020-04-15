import { Component, OnInit, ViewChild } from '@angular/core';
import { ThailandService } from './service/thailand.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-thailand',
  templateUrl: './thailand.component.html',
  styleUrls: ['./thailand.component.css'],
})
export class ThailandComponent implements OnInit {
  public covid19: any = {};
  public covid19Province: any[] = [];
  public myDate = new Date();
  public updateDate = null;

  displayedColumns: string[] = ['province', 'cases'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private thailandService: ThailandService,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.getCovidThai();
    this.getCovidProvince();
  }

  getCovidThai() {
    this.covid19 = this.thailandService.getCovidThai().subscribe((data: {}) => {
      this.covid19 = data;
    });
  }

  getCovidProvince() {
    this.thailandService
      .getCovidProvince()
      .subscribe((data: { Province: {} }) => {
        console.log(data.Province);
        this.covid19Province = Object.keys(data.Province).map((key) => ({
          province: key,
          cases: data.Province[key],
        }));
        this.dataSource = new MatTableDataSource(this.covid19Province);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.setTimeout();
      });
  }

  setTimeout() {
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
  }
}
