import {Component, Input, OnInit} from '@angular/core';
import {Sportcomplex} from '../../sportcomplex.model';

@Component({
  selector: 'app-sportcomplex-item',
  templateUrl: './sportcomplex-item.component.html',
  styleUrls: ['./sportcomplex-item.component.css']
})
export class SportcomplexItemComponent implements OnInit {
  @Input() index: number;
  @Input() sportcomplex: Sportcomplex;

  ngOnInit() {
  }

}
