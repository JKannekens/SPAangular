import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Sportcomplex} from '../sportcomplex.model';
import {SportcomplexService} from '../sportcomplex.service';



@Component({
  selector: 'app-sportcomplex-detail',
  templateUrl: './sportcomplex-detail.component.html',
  styleUrls: ['./sportcomplex-detail.component.css']
})
export class SportcomplexDetailComponent implements OnInit {
  sportcomplex: Sportcomplex;
  id: number;

  constructor(private sportcomplexService: SportcomplexService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.sportcomplex = this.sportcomplexService.getSportcomplex(this.id);
        }
      );
  }

  onEditSportcomplex() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteSportcomplex() {
    this.sportcomplexService.deleteSportcomplex(this.id);
    this.router.navigate(['/sportcomplexes']);
  }
}
