import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Planet } from './planet.class';
import { MessageService } from './message.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({ providedIn: 'root' })
export class PlanetService {

  private planetsUrl = 'api/planets';  // URL to web api
  private data: dataItem[];

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a PlanetService message with the MessageService */
  private log(message: string) {
    this.messageService.add('PlanetService: ' + message);
  }

  getPlanets(): Observable<Planet[]> {
    return this.http.get<Planet[]>(this.planetsUrl)
      .pipe(
        map(res => { return this.orderPlanets(res, 'votes'); }),
        tap(planets => this.log(`fetched planets`)),
        catchError(this.handleError('getPlanets', []))
      );
  }

  getPlanet(id: number): Observable<Planet> {
    const url = `${this.planetsUrl}/${id}`;
    return this.http.get<Planet>(url).pipe(
      tap(_ => this.log(`fetched planet id=${id}`)),
      catchError(this.handleError<Planet>(`getPlanet id=${id}`))
    );
  }

  updatePlanet (planet: Planet): Observable<any> {
    return this.http.put(this.planetsUrl, planet, httpOptions).pipe(
      tap(_ => this.log(`updated planet id=${planet.id}`)),
      catchError(this.handleError<any>('updatePlanet'))
    );
  }

  votePlanet (planet: Planet): Observable<any> {
    planet.votes++;
    return this.http.put(this.planetsUrl, planet, httpOptions).pipe(
      tap(_ => this.log(`updated planet rank=${planet.votes}`)),
      catchError(this.handleError<any>('updatePlanet'))
    );
  }

  /** POST: add a new planet to the server */
  addPlanet (planet: Planet): Observable<Planet> {
    planet.votes = 0;
    return this.http.post<Planet>(this.planetsUrl, planet, httpOptions).pipe(
      tap((planet: Planet) => this.log(`added planet w/ id=${planet.id}`)),
      catchError(this.handleError<Planet>('addPlanet'))
    );
  }

  /** DELETE: delete the planet from the server */
  deletePlanet (planet: Planet | number): Observable<Planet> {
    const id = typeof planet === 'number' ? planet : planet.id;
    const url = `${this.planetsUrl}/${id}`;

    return this.http.delete<Planet>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted planet id=${id}`)),
      catchError(this.handleError<Planet>('deletePlanet'))
    );
  }

  getPlanetNo404<Data>(id: number): Observable<Planet> {
    const url = `${this.planetsUrl}/?id=${id}`;
    return this.http.get<Planet[]>(url)
      .pipe(
        map(planets => planets[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} planet id=${id}`);
        }),
        catchError(this.handleError<Planet>(`getPlanet id=${id}`))
      );
  }

  searchPlanets(term: string): Observable<Planet[]> {
    console.log(term);
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Planet[]>(`${this.planetsUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found planets matching "${term}"`)),
      catchError(this.handleError<Planet[]>('searchPlanets', []))
    );
  }

  orderPlanets(data: dataItem[],  field: string) {
    data.sort((a, b) => a[field] > b[field] ? -1 : 1);
    return data;
  }



}
