import { Component, OnInit } from '@angular/core';
import {Sportcomplex} from '../sportcomplex.model';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {SportcomplexService} from '../sportcomplex.service';

@Component({
  selector: 'app-sportcomplex-list',
  templateUrl: './sportcomplex-list.component.html',
  styleUrls: ['./sportcomplex-list.component.css']
})
export class SportcomplexListComponent implements OnInit {

  private subscription: Subscription;
  sportcomplexes: Sportcomplex[];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private sportcomplexService: SportcomplexService) {
  }

  ngOnInit() {
    this.sportcomplexService.getSportcomplexes()
      .then(sportcomplexes => this.sportcomplexes = sportcomplexes)
      .catch(error => console.log(error));
    this.subscription = this.sportcomplexService.sportcomplexesChanged
      .subscribe(
        (sportcomplexes: Sportcomplex[]) => {
          this.sportcomplexes = sportcomplexes;
        }
      );
  }

  onNewSportcomplex() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
