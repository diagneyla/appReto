import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { DataServiceService } from 'src/app/shared/data-service.service';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.scss'],
})
export class HeroeComponent implements OnInit {
  @Input() hero: any;
  radarChartData: ChartDataSets[] = [];
  radarChartLabels: Label[] = [];

  selectedRoute: string;
  constructor(
    private dataService: DataServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.selectedRoute = this.route.routeConfig.path;
    let herodata = [];
    Object.keys(this.hero.powerstats).forEach((key: string) => {
      this.radarChartLabels.push(key.toUpperCase());
      herodata.push(
        this.hero.powerstats[key] !== 'null'
          ? parseInt(this.hero.powerstats[key])
          : 0
      );
    });
    this.radarChartData.push({
      data: herodata,
    });
  }

  setSelectedHero(hero) {
    this.dataService.setSelectedHero(hero);
    this.router.navigate(['/hero-detail']);

  }

  addHeroToTeam() {
    if (this.authService.isLoggedIn) {
    this.dataService.addHeroToTeam(this.hero);

    } else {
      this.router.navigate(['/login']);
    }
  }

  removeHeroFromTeam() {
    this.dataService.removeHeroFromTeam(this.hero);
  }
}