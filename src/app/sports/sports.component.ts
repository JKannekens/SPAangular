import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Sport} from '../shared/sports.model';
import {ActivatedRoute, Router} from '@angular/router';
import {SportsService} from './sports.service';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css']
})
export class SportsComponent implements OnInit {

  private subscription: Subscription;
  sports: Sport[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sportService: SportsService
  ) { }

  ngOnInit() {
    this.sportService.getSports()
      .then(sports => this.sports = sports)
      .catch(error => console.log(error));
    this.subscription = this.sportService.sportsChanged
      .subscribe(
        (sports: Sport[]) => {
          this.sports = sports;
        }
      );
  }

  ngOnChanges(): void {
    this.ngOnInit();
    console.log('tez');

  }

  onEditSport(index: number) {
    this.sportService.startedEditing.next(index);
  }
}

