import {Component, Input, OnInit} from '@angular/core';
import {Sport} from '../../../shared/sports.model';

@Component({
  selector: 'app-sports-item',
  templateUrl: './sports-item.component.html',
})
export class SportsItemComponent implements OnInit {
  @Input() index: number;
  @Input() sport: Sport;

  ngOnInit() {
  }

}
