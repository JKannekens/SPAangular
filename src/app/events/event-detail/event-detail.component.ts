import { Component, OnInit } from '@angular/core';
import {EventService} from '../event.service';
import {Event} from '../event.model';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css'],
})
export class EventDetailComponent implements OnInit {
  event: Event;
  id: number;

  constructor(private eventService: EventService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.event = this.eventService.getEvent(this.id);
        }
      );
  }

  onEditEvent() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteEvent() {
    this.eventService.deleteEvent(this.id);
    this.router.navigate(['/events']);
  }
}

