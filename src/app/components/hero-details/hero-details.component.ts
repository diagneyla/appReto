import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/shared/data-service.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss']
})
export class HeroDetailsComponent implements OnInit {
  selectedHero: any;
  constructor(private dataService: DataServiceService, 
  private router: Router, 
  private location: Location,
  private authService: AuthService) { }

  ngOnInit(): void {
    this.selectedHero = this.dataService.selectedhero 
    ? this.dataService.selectedhero : 
    this.router.navigate(['/heroes']);
  }
  addHeroToTeam() {
    if (this.authService.isLoggedIn) {
    this.dataService.addHeroToTeam(this.selectedHero);

   } else {
     this.router.navigate(['/login']);
   }
  }

  goBack(){
    this.location.back();
  }
}
