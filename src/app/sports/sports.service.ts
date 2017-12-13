import { Sport } from '../shared/sports.model';
import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment.prod';
import 'rxjs/add/operator/toPromise';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class SportsService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private serverUrl = environment.serverUrl + '/sports'; // URL to web api
  private sports: Sport[];

  sportsChanged = new Subject<Sport[]>();
  startedEditing = new Subject<number>();

  constructor(private http: Http) {
    this.getSports();
  }

  public getSports(): Promise<Sport[]> {
    console.log('sports ophalen van server');
    return this.http.get(this.serverUrl, {headers: this.headers})
      .toPromise()
      .then(response => {
        this.sports = response.json() as Sport[];
        return response.json() as Sport[];
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  getSport(index: number) {
    return this.sports[index];
  }

  addSport(sport: Sport) : Promise<Sport> {
    this.sports.push(sport);
    this.sportsChanged.next(this.sports.slice());

    console.log('Sport toevoegen: ' + sport.name);
    return this.http.post(this.serverUrl,
      {
        name: sport.name,
        headers: this.headers
      })
      .toPromise()
      .then(response => {
        return response.json() as Sport;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  updateSport(index: number, newSport: Sport) {
    newSport.id = this.sports[index].id;

    this.sports[index] = newSport;
    this.sportsChanged.next(this.sports.slice());

    console.log('Sport updaten: ' + newSport.name);
    return this.http.put(this.serverUrl + '/' + newSport.id, {
      name: newSport.name,
      headers: this.headers})
      .toPromise()
      .then(response => {
        return response.json() as Sport;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  deleteSport(index: number) {
    const sportToDelete = this.sports[index];

    this.sports.splice(index, 1);
    this.sportsChanged.next(this.sports.slice());

    console.log('Sport verwijderen: ' + sportToDelete.name);
    return this.http.delete(this.serverUrl + '/' + sportToDelete.id)
      .toPromise()
      .then(response => {
        return response.json() as Sport;
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
