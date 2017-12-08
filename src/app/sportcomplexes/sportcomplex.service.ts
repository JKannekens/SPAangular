import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Sportcomplex} from './sportcomplex.model';
import {Http} from '@angular/http';
import {Headers} from '@angular/http';
import {environment} from '../../environments/environment.prod';

@Injectable()
export class SportcomplexService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private serverUrl = environment.serverUrl + '/sportcomplexes'; // URL to web api
  private sportcomplexes: Sportcomplex[] = [];

  sportcomplexesChanged = new Subject<Sportcomplex[]>();

  constructor(private http: Http) {}

  public getSportcomplexes(): Promise<Sportcomplex[]> {
      console.log('recipes ophalen van server');
    return this.http.get(this.serverUrl, {headers: this.headers})
      .toPromise()
      .then(response => {
        console.dir(response.json());
        this.sportcomplexes = response.json() as Sportcomplex[];
        return response.json() as Sportcomplex[];
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  getSportcomplex(index: number) {
    return this.sportcomplexes[index];
  }

  addSportComplex(sportcomplex: Sportcomplex) : Promise<Sportcomplex> {
    this.sportcomplexes.push(sportcomplex);
    this.sportcomplexesChanged.next(this.sportcomplexes.slice());

    console.log('Sportcomplex toevoegen: ' + sportcomplex.name);
    return this.http.post(this.serverUrl,
      {
        name: sportcomplex.name,
        address: sportcomplex.address,
        houseNumber: sportcomplex.houseNumber,
        postalCode: sportcomplex.postalCode,
        email: sportcomplex.email,
        phoneNumber: sportcomplex.phoneNumber,
        halls: sportcomplex.halls,
        headers: this.headers
      })
      .toPromise()
      .then(response => {
        console.log(response.json() as Sportcomplex);
        return response.json() as Sportcomplex;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  updateSportComplex(index: number, newSportComplex: Sportcomplex) : Promise<Sportcomplex> {
    newSportComplex._id = this.sportcomplexes[index]._id;

    this.sportcomplexes[index] = newSportComplex;
    this.sportcomplexesChanged.next(this.sportcomplexes.slice());

    console.log('Sportcomplex updaten: ' + newSportComplex.name);
    return this.http.put(this.serverUrl + '/' + newSportComplex._id, {
      name: newSportComplex.name,
      address: newSportComplex.address,
      houseNumber: newSportComplex.houseNumber,
      postalCode: newSportComplex.postalCode,
      email: newSportComplex.email,
      phoneNumber: newSportComplex.phoneNumber,
      halls: newSportComplex.halls,
      headers: this.headers})
      .toPromise()
      .then(response => {
        return response.json() as Sportcomplex;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  deleteSportcomplex(index: number) : Promise<Sportcomplex> {
    const sportcomplexToDelete = this.sportcomplexes[index];

    this.sportcomplexes.splice(index, 1);
    this.sportcomplexesChanged.next(this.sportcomplexes.slice());

    console.log('Sportcomplex verwijderen: ' + sportcomplexToDelete.name);
    return this.http.delete(this.serverUrl + '/' + sportcomplexToDelete._id)
      .toPromise()
      .then(response => {
        return response.json() as Sportcomplex;
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



