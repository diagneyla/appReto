import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { DataServiceService } from 'src/app/shared/data-service.service';
import { NotificationService } from 'src/app/shared/notification.service';
import data from '../../../assets/heroelista.json';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
})
export class BuscadorComponent implements OnInit {
  forma: FormGroup;
  heroOptions: HeroName[] = data;
  filteredOptions: Observable<HeroName[]>;
  toHighlight: string = '';
  filteredHeroes!: HeroName[];
  matchHeros: any;

  get heroeBuscado() {
    return this.forma.get('heroeBuscado').value;
  }

  get selectedHero() {
    return this.dataService.selectedhero;
  }

  constructor(
    private fb: FormBuilder,
    private dataService: DataServiceService,
    private ns: NotificationService
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.filteredOptions = this.forma.get('heroeBuscado').valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.name)),
      map((name) => (name ? this._filter(name) : this.heroOptions.slice())),
      tap((heroes) => (this.filteredHeroes = heroes))
    );
  }

  displayFn(hero: HeroName): string {
    return hero && hero.name ? hero.name : '';
  }

  private _filter(name: string): HeroName[] {
    this.toHighlight = name;
    const filterValue = name.toLowerCase();

    return this.heroOptions.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  crearFormulario() {
    this.forma = this.fb.group({
      heroeBuscado: [''],
    });
  }

  buscarHeroe() {
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) =>
            control.markAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      });
    }
    this.matchHeros = this.dataService.searchHeroes(this.filteredHeroes);
  }
}

export interface HeroName {
  name: string;
  id: string;
}
