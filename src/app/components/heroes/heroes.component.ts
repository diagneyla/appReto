import {  Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  @Input() heroes: any;
  @Output() selectedHero: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  setSelectedhero(hero: any) {
    this.selectedHero.emit(hero);
  }
}
