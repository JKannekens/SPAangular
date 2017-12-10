import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Event} from '../event.model';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  private subscription: Subscription;
  events: Event[];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private eventService: EventService) {
  }

  ngOnInit() {
    this.eventService.getEvents()
      .then(events => this.events = events)
      .catch(error => console.log(error));
    this.subscription = this.eventService.eventChanged
      .subscribe(
        (events: Event[]) => {
          this.events = events;
        }
      );
  }

  onNewEvent() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}

