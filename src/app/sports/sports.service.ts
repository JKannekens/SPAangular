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
  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }
}
