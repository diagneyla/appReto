import { Component, Input, OnInit } from '@angular/core';
import { RadialChartOptions } from 'chart.js';
import { ChartDataSets } from 'chart.js';
import { ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-powerstats',
  templateUrl: './powerstats.component.html',
  styleUrls: ['./powerstats.component.scss']
})
export class PowerstatsComponent implements OnInit {
  @Input()
  radarChartData!: ChartDataSets[];
  @Input()
  radarChartLabels!: Label[];

  public radarChartType: ChartType = 'radar';
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
    legend: {
      display: false,
      labels: {
        fontColor: 'indigo',
      },
    },
    layout: {
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    scale: {
      gridLines: {
        color: [
          'indigo',
          'darkviolet',
          'blueviolet',
          'darkorchid',
          'darkslateblue',
        ],
      },
      angleLines: {
        color: 'darkslateblue',
      },
      pointLabels: {
        fontColor: '#e30022',
        fontSize: 10,
        fontStyle: '800',
      },
      ticks: {
        display: false,
        suggestedMax: 100,
        suggestedMin: 0,
        stepSize: 25,
      },
    },
  };

  constructor() { }

  ngOnInit(): void {
    
  }

}
