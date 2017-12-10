import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Http} from '@angular/http';
import {Headers} from '@angular/http';
import {environment} from '../../environments/environment.prod';
import {Event} from './event.model';

@Injectable()
export class EventService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private serverUrl = environment.serverUrl + '/events'; // URL to web api
  private events: Event[] = [];

  eventChanged = new Subject<Event[]>();

  constructor(private http: Http) {}

  public getEvents(): Promise<Event[]> {
    console.log('Events ophalen van server');
    return this.http.get(this.serverUrl, {headers: this.headers})
      .toPromise()
      .then(response => {
        console.dir(response.json());
        this.events = response.json() as Event[];
        return response.json() as Event[];
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  getEvent(index: number) {
    return this.events[index];
  }

  addEvent(event: Event) : Promise<Event> {
    this.events.push(event);
    this.eventChanged.next(this.events.slice());

    console.log('Event toevoegen: ' + event.eventName);
    return this.http.post(this.serverUrl,
      {
        organizerName: event.organizerName,
        eventName: event.eventName,
        date: event.date,
        sportcomplexName: event.sportcomplexName,
        sportcomplexHall: event.sportcomplexHall,
        participants: event.participants,
        headers: this.headers
      })
      .toPromise()
      .then(response => {
        console.log(response.json() as Event);
        return response.json() as Event;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  updateEvent(index: number, newEvent: Event) : Promise<Event> {
    newEvent._id = this.events[index]._id;

    this.events[index] = newEvent;
    this.eventChanged.next(this.events.slice());

    console.log('Event updaten: ' + newEvent.eventName);
    return this.http.put(this.serverUrl + '/' + newEvent._id, {
      organizerName: newEvent.organizerName,
      eventName: newEvent.eventName,
      date: newEvent.date,
      sportcomplexName: newEvent.sportcomplexName,
      sportcomplexHall: newEvent.sportcomplexHall,
      participants: newEvent.participants,
      headers: this.headers})
      .toPromise()
      .then(response => {
        return response.json() as Event;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  deleteEvent(index: number) : Promise<Event> {
    const eventToDelete = this.events[index];

    this.events.splice(index, 1);
    this.eventChanged.next(this.events.slice());

    console.log('Event verwijderen: ' + eventToDelete.eventName);
    return this.http.delete(this.serverUrl + '/' + eventToDelete._id)
      .toPromise()
      .then(response => {
        return response.json() as Event;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }
}



