import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  DataServiceService,
  Powerstats,
} from 'src/app/shared/data-service.service';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  private _onDestroy = new Subject();
  myTeam: any[] = [];
  mainSkill = '-';
  averageWeight = '0.0 kg (0.0 lbs)';
  averageHeight = "0.0 cm (0' 0'')";
  teamPowerstatsArray: MeterProperty[] = [];
  teamPowerstatsObject: Powerstats = {
    intelligence: 0,
    strength: 0,
    speed: 0,
    durability: 0,
    power: 0,
    combat: 0,
  };

  get selectedHero() {
    return this.dataService.selectedhero;
  }
  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {this.setTeamPowerstats();
    this.dataService.myTeam$
      .pipe(takeUntil(this._onDestroy))
      .subscribe((team) => {
        if (team.length !== 0) {
          this.myTeam = [...team];
          this.setTeamPowerstats();
        } else {
          this.resetTeamPowerstatsObject();
          this.resetTeamPowerStats();
          this.myTeam = [...team];
        }
      });
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
  }

  hideDetails() {
    this.dataService.setSelectedHero(undefined);
  }

  setTeamPowerstats() {
    this.resetTeamPowerstatsObject();
    this.myTeam.forEach((hero) => {
      Object.keys(hero.powerstats).forEach((key) => {
        this.teamPowerstatsObject[key] +=
          hero.powerstats[key] !== 'null' ? parseInt(hero.powerstats[key]) : 0;
      });
    });
    Object.keys(this.teamPowerstatsObject).forEach((key: string) => {
      let meterProperty: MeterProperty = { label: '', value: 0 };
      meterProperty.label = key;
      meterProperty.value = this.teamPowerstatsObject[key];
      this.teamPowerstatsArray.push(meterProperty);
    });
    this.setAverageWeight();
    this.setAverageHeight();
    this.setMainSkill();
    console.log('TEAM: ', this.myTeam);
  }

  setMainSkill() {
    if (this.myTeam.length > 0) {
      const maxProperty = this.teamPowerstatsArray.reduce((prev, current) => {
        return prev.value > current.value ? prev : current;
      });
      this.mainSkill = maxProperty.label;
    } else {
      this.mainSkill = '-';
    }
  }

  setAverageHeight() {
    let avgHeight = 0;
    this.myTeam.forEach((hero) => {
      avgHeight += parseFloat(hero.appearance.height[1]);
    });
    this.myTeam.length > 0 ? (avgHeight /= this.myTeam.length) : 0;
    this.averageHeight = `${avgHeight.toFixed(1)} cm (${this.toFeet(
      avgHeight
    )})`;
  }

  setAverageWeight() {
    let avgWeight = 0;
    this.myTeam.forEach((hero) => {
      avgWeight += parseFloat(hero.appearance.weight[1]);
    });
    this.myTeam.length > 0 ? (avgWeight /= this.myTeam.length) : 0;
    this.averageWeight = `${avgWeight.toFixed(1)} kg (${this.toLbs(
      avgWeight
    ).toFixed(1)} lbs)`;
  }

  toLbs(kg) {
    return kg * 2.2046;
  }

  toFeet(cm): string {
    let realFeet = (cm * 0.3937) / 12;
    let feet = Math.floor(realFeet);
    let inches = Math.round((realFeet - feet) * 12);
    return feet + "'" + ' ' + inches + "''";
  }

  resetTeamPowerstatsObject() {
    this.teamPowerstatsArray.length = 0;
    Object.keys(this.teamPowerstatsObject).forEach(
      (key) => (this.teamPowerstatsObject[key] = 0)
    );
  }

  resetTeamPowerStats() {
    this.mainSkill = '-';
    this.averageWeight = '0.0 kg (0.0 lbs)';
    this.averageHeight = "0.0 cm (0' 0'')";
    Object.keys(this.teamPowerstatsObject).forEach((key: string) => {
      let meterProperty: MeterProperty = { label: '', value: 0 };
      meterProperty.label = key;
      this.teamPowerstatsArray.push(meterProperty);
    });
  }
}


export interface MeterProperty {
  label: string;
  value: number;
}
