import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginDataLabels  from 'chartjs-plugin-annotation';
import { ContributionService } from 'src/app/services/contribution.service';
import { Contribution } from 'src/app/models/contribution.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  role = localStorage.getItem("role");
  contributions?: Contribution[];
  IT: number;
  BA: number;
  GD: number;
  total: number;

  pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  pieChartLabels: Label[] = ["IT","BA","GD"];
  pieChartDataPer: number[] = [];
  pieChartDataNum: number[] = [];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartPlugins = [pluginDataLabels];
  pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

  barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  barChartLabels: Label[] = ['IT', 'BA', 'GD'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [pluginDataLabels];

  barChartData: ChartDataSets[] = [{data: [0,0,0], label: "Number of contributions"}];

  constructor(
    private loginService: LoginService,
    private contributionService: ContributionService) { }

  ngOnInit(): void {
    this.retrieveContributions();
    setTimeout(() => {
      this.chart.chart.update()
  }, 0);
  }

  retrieveContributions(): void {
    this.contributionService.getAll()
      .subscribe(
        data => {
          this.contributions = data;
          console.log(this.contributions);
          this.total = this.contributions.length;
          this.IT = this.contributions.filter(e => e.faculty == 2).length;
          this.BA = this.contributions.filter(e => e.faculty == 3).length;
          this.GD = this.contributions.filter(e => e.faculty == 4).length;
          this.pieChartDataPer.push(this.IT/this.total*100);
          this.pieChartDataPer.push(this.BA/this.total*100);
          this.pieChartDataPer.push(this.GD/this.total*100);
          this.barChartData[0]["label"] = "Number of contributions";
          this.barChartData[0]["data"] = [this.IT,this.BA,this.GD];
          console.log(this.barChartData);
        },
        error => {
          console.log(error);
        });
  }

  logout() {
    this.loginService.logout();
    
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  changeLegendPosition(): void {
    this.pieChartOptions.legend.position = this.pieChartOptions.legend.position === 'left' ? 'top' : 'left';
  }
}
