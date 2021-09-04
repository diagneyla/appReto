import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-meter',
  templateUrl: './meter.component.html',
  styleUrls: ['./meter.component.scss'],
})
export class MeterComponent implements OnInit {
  @Input() amountValue;
  @Input() label: string;
  diameter: number = 100;
  maxPropertyValue = 600;
  percentValue: number = 0;
  colorClass: string;
  isDeterminate: boolean = true;
  spinnerStyle: {};

  private percentsValues = [0, 25, 50, 75, 100];

  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {}

  ngOnChanges(changes: SimpleChanges) {
    this.spinnerStyle = { color: '#000000' };
    this.percentValue = this.setPercent(changes.amountValue.currentValue);
    this.getTimersGroup(this.percentValue);
  }

  private setSpinnerColor(group: number) {
    const colors = ['transparent', '#333333', '#ffd600', '#fe913f', '#d32f2f'];

    this.colorClass = `group-${group}`;
    this.spinnerStyle = { color: colors[group] };
  }

  private setPercent(value: number): number {
    return value / this.maxPropertyValue;
  }

  private getTimersGroup(pct: number) {
    pct *= 100;
    const defaultGroup = this.percentsValues.length - 1;
    let actualGroup = defaultGroup;
    for (
      let i = 0;
      i < this.percentsValues.length && actualGroup === defaultGroup;
      i++
    ) {
      if (this.percentsValues[i] >= pct) {
        actualGroup = i;
      }
    }
    this.setSpinnerColor(actualGroup);
  }

  getDiameter(): number {
    return this.diameter;
  }
}
