import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from './notification.service';
import data from '../../assets/heroelista.json';
import herodata from '../../assets/heroDatabase.json';
import { HeroName } from '../components/buscador/buscador.component';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {

  data = data;
  herodata = herodata;
  url = 'https://superheroapi.com/api.php/10159088865924303/search/';
  heroDataBase: HeroDetails[] = [];
  private myTeamSubject: BehaviorSubject<any[]> = new BehaviorSubject([]);
  myTeam$ = this.myTeamSubject.asObservable();
  myTeam: any[] = [];
  selectedhero: any;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}
  searchHeroes(heroes: HeroName[]): any {
    let matchedHeroes = heroes
      .map((heroName) =>
        this.heroDataBase.find((hero) => hero.id === heroName.id)
      )
      .filter((hero) => !!hero === true);

    return matchedHeroes;
  }
  getAllHeroes() {
   /* this.heroDataBase = this.herodata;
    console.log(this.heroDataBase);*/
     let searchList = this.data.map((hero) => { return hero.name });
    searchList.forEach(name => {
      this.http.get(this.url+name).subscribe((res: HeroApiResp) => {
        if (res.response === "error") {
          console.log("HEROE NO EXISTE");
        } else {
          this.heroDataBase.push(res.results[0]);
        }
      })
    });
    setTimeout(() => {
      console.log(this.heroDataBase)
    }, 15000); 
  }

  addHeroToTeam(heroSelected: any) {
    if (this.myTeam.length < 6) {
      if (this.myTeam.some((hero) => hero.id === heroSelected.id)) {
        this.notificationService.notification$.next({
          msg: 'heroe ya existe en el equipo',
          type: 'error',
        });
      } else {
        let goodHeros: any = this.myTeam.filter(
          (hero) => hero.biography.alignment === 'good'
        ).length;
        let badHeros: any = this.myTeam.filter(
          (hero) => hero.biography.alignment === 'bad'
        ).length;
        if (goodHeros < 3 && heroSelected.biography.alignment === 'good') {
          this.myTeam.push(heroSelected);
          this.myTeamSubject.next(this.myTeam);
          this.notificationService.notification$.next({
            msg: heroSelected.name + ' succesfully added to your team',
            type: 'success',
          });
        } else if (heroSelected.biography.alignment === 'good') {
          this.notificationService.notification$.next({
            msg: 'equipo bueno completo',
            type: 'error',
          });
        }
        if (badHeros < 3 && heroSelected.biography.alignment === 'bad') {
          this.myTeam.push(heroSelected);
          this.myTeamSubject.next(this.myTeam);
          this.notificationService.notification$.next({
            msg: heroSelected.name + ' succesfully added to your team',
            type: 'success',
          });
        } else if (heroSelected.biography.alignment === 'bad') {
          this.notificationService.notification$.next({
            msg: 'equipo malo completo',
            type: 'error',
          });
        }
      }
    } else {
      this.notificationService.notification$.next({
        msg: 'equipo lleno',
        type: 'error',
      });
    }
  }

  removeHeroFromTeam(heroSelected: any) {
    this.myTeam.splice(this.myTeam.indexOf(heroSelected), 1);
    this.myTeamSubject.next(this.myTeam);
  }

  setSelectedHero(hero: any) {
    this.selectedhero = hero;
  }
}

export interface HeroApiResp {
  response: string;
  error?: string;
  results?: any[];
  'results-for'?: string;
}

export interface HeroDetails {
  id: string;
  name: string;
  powerstats: {
    intelligence: string;
    strength: string;
    speed: string;
    durability: string;
    power: string;
    combat: string;
  };
  biography: {
    'full-name': string;
    'alter-egos': string;
    aliases: string[];
    'place-of-birth': string;
    'first-appearance': string;
    publisher: string;
    alignment: string;
  };
  appearance: {
    gender: string;
    race: string;
    height: string[];
    weight: string[];
    'eye-color': string;
    'hair-color': string;
  };
  work: {
    occupation: string;
    base: string;
  };
  connections: {
    'group-affiliation': string;
    relatives: string;
  };
  image: {
    url: string;
  };
}

export interface Powerstats {
  intelligence: number;
  strength: number;
  speed: number;
  durability: number;
  power: number;
  combat: number;
}
