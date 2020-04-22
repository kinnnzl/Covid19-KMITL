import { Component, OnInit, ViewChild } from '@angular/core';
import { ThailandService } from './service/thailand.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChartType, ChartOptions } from 'chart.js';
import {
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
} from 'ng2-charts';

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
  public pieTypeGender: ChartType = 'pie';
  public pieLegendGender: any;
  public pieLabelsGender: Label[];
  public pieDataGender: SingleDataSet = [];
  public chartColorsGender: Array<any> = [];
  public pieTypeNation: ChartType = 'pie';
  public pieLegendNation: any;
  public pieLabelsNation: Label[];
  public pieDataNation: SingleDataSet = [];
  public chartColorsNation: Array<any> = [];

  public pieChartPlugins = [];
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom',
    },
  };

  displayedColumns: string[] = ['province', 'cases'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private thailandService: ThailandService,
    private spinner: NgxSpinnerService
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

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
        console.log(data);
        this.covid19Province = Object.keys(data.Province).map((key) => ({
          province: key,
          cases: data.Province[key],
        }));
        this.dataSource = new MatTableDataSource(this.covid19Province);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.setChart(data);
        this.spinner.hide();
      });
  }

  setChart(data: any) {
    // ------------------------------- PieChartGender -----------------------------------

    // Set pieChartLegend
    this.pieLegendGender = true;

    // Set pieChartLabels
    this.pieLabelsGender = ['Male', 'Female', 'Unknown'];

    // Set pieChartData
    this.pieDataGender = [
      data.Gender.Male,
      data.Gender.Female,
      data.Gender.Unknown,
    ];

    // Set pieChartColorGender
    this.chartColorsGender.push({
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870'],
      borderWidth: 2,
    });

    // ------------------------------- PieChartNation -----------------------------------
    const nations: Array<any> = Object.keys(data.Nation).map((key) => ({
      nation: key,
      amount: data.Nation[key],
    }));

    // Set pieChartLegend
    this.pieLegendNation = true;

    // Set pieChartLabels
    let other = 0;
    for (const item of nations) {
      switch (item) {
        case 'Thai':
        case 'Unknown':
        case 'Chinese':
        case 'French':
        case 'British':
          break;
        default:
          other += item.amount;
      }
    }
    this.pieLabelsNation = ['Thai', 'Unknown', 'Chinese', 'French', 'Other'];

    // Set pieChartData
    this.pieDataNation = [
      nations[0].amount,
      nations[1].amount,
      nations[2].amount,
      nations[3].amount,
      other
    ];

    // Set pieChartColorGender
    this.chartColorsNation.push({
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
      borderWidth: 2,
    });
  }
}
