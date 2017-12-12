import { Component, OnInit } from '@angular/core';
import {Sport} from '../../shared/sports.model';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {SportsService} from '../sports.service';

@Component({
  selector: 'app-sports-list',
  templateUrl: './sports-list.component.html'
})
export class SportsListComponent implements OnInit {

  private subscription: Subscription;
  sports: Sport[];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private sportsService: SportsService) {
  }

  ngOnInit() {
    this.sportsService.getSports()
      .then(sports => this.sports = sports)
      .catch(error => console.log(error));
    this.subscription = this.sportsService.sportsChanged
      .subscribe(
        (sports: Sport[]) => {
          this.sports = sports;
        }
      );
  }

  onNewSport() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
