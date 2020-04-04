import { Component, OnInit } from '@angular/core';
import { HomeService } from './service/home.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public covid19: any = {};
  public myDate = new Date();
  public updateDate = null;

  constructor(
    private homeService: HomeService,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.getCovidAll();
  }

  getCovidAll() {
    this.covid19 = this.homeService.getCovidAll().subscribe((data: {}) => {
      this.covid19 = data;
      this.updateDate = this.datePipe.transform(this.myDate, 'dd-mm-yyyy');
      console.log(this.covid19);
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
