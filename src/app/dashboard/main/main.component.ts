import { Component, OnInit, ViewChild } from "@angular/core";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexPlotOptions,
  ApexResponsive,
  ApexStroke,
  ApexLegend,
  ApexFill,
} from "ng-apexcharts";
import { ProfileService } from "../../profile/services/profile.service";
import { DependantService } from "../../dependant/services/dependant.service";
import { OrganizationService } from "../../organization/service/organization.service";

declare const $: any;
export type areaChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  colors: string[];
};

export type barChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  colors: string[];
};

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit {
  //GET ALL USER ORGANIZATION
  //GET ALL Organization
  allOrganizationResult: any;
  allOrganizationList: any;
  totalOrganizations: 0;


  //GET ALL DEPENDANT
  allDependantResult: any;
  allDependantList: any;
  totalDependants: 0;


  //GET USER BY ID
  userResult: any;
  userData: any;

  // ERROR RESPONSE
  errorResp: any;

  @ViewChild("chart") chart: ChartComponent;
  public areaChartOptions: Partial<areaChartOptions>;
  public barChartOptions: Partial<barChartOptions>;
  constructor(
    public profileService: ProfileService,
    public dependantService: DependantService,
    public organizationService: OrganizationService
  ) { }

  ngOnInit() {
    $("#sparkline").sparkline([5, 6, 7, 2, 0, -4, -2, 4], {
      type: "bar",
    });
    $("#sparkline2").sparkline([5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6, 7], {
      type: "line",
    });
    $("#sparkline3").sparkline([5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6, 7], {
      type: "line",
    });
    $("#sparkline4").sparkline([4, 6, 7, 7, 4, 3, 2, 1, 4, 4], {
      type: "discrete",
    });
    $("#sparkline5").sparkline([1, 1, 2], {
      type: "pie",
    });
    $("#sparkline6").sparkline([2, -4, 5, 2, 0, 4, -2, 4], {
      type: "bar",
    });
    this.chart1();
    this.chart2();
    this.getUser();
    this.getAllDependants();
    this.getAllUserOrganizations();
  }
  private chart1() {
    this.areaChartOptions = {
      series: [
        {
          name: "Permissions",
          data: [31, 40, 28, 51, 42, 85, 77],
        },
        {
          name: "Dependants",
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
      chart: {
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
        foreColor: "#9aa0ac",
      },
      colors: ["#9F8DF1", "#E79A3B"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "center",
        offsetX: 0,
        offsetY: 0,
      },

      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    };
  }

  private chart2() {
    this.barChartOptions = {
      series: [
        {
          name: "percent",
          data: [5, 8, 10, 14, 9, 7, 11, 5, 9, 16, 7, 5],
        },
      ],
      chart: {
        height: 320,
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },

      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        position: "bottom",
        labels: {
          offsetY: 0,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
          offsetY: -35,
        },
      },
      fill: {
        type: "gradient",
        colors: ["#4F86F8", "#4F86F8"],
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100],
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val + "%";
          },
        },
      },
    };
  }

  // GETTING USER DETAILS
  getUser() {
    this.profileService.getUser().subscribe((result) => {
      this.userResult = result;
      if (this.userResult.statusCode === 200) {
        this.userData = this.userResult.data;
      } else {
        this.errorResp = this.userResult.description;
      }
    });
  }

  // GETTING ALL DEPENDANTS
  getAllDependants() {
    this.dependantService.getAllDependants().subscribe((result) => {
      this.allDependantResult = result;
      if (this.allDependantResult.statusCode === 200) {
        this.allDependantList = this.allDependantResult.data;
        this.totalDependants = this.allDependantList.length;
      } else {
        this.errorResp = this.allDependantResult.description;
      }
    });
  }

  //GETTING ALL USER ORGANIZATION
  getAllUserOrganizations() {
    this.organizationService.getAllUserOrganizations().subscribe((result) => {
      this.allOrganizationResult = result;
      if (this.allOrganizationResult.statusCode === 200) {
        this.allOrganizationList = this.allOrganizationResult.data;
        this.totalOrganizations = this.allOrganizationList.length;
      } else {
        this.errorResp = this.allOrganizationResult.description;
      }
    });
  }
}
