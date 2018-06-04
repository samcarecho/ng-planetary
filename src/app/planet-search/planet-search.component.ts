import {Component, Injectable, OnInit} from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Planet } from '../planet.class';
import { PlanetService } from '../planet.service';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';



@Component({
  selector: 'app-planet-search',
  templateUrl: './planet-search.component.html',
  styleUrls: [ './planet-search.component.css' ]
})
export class PlanetSearchComponent implements OnInit {
  planets$: Observable<Planet[]>;
  private searchTerms: Subject<string>;

  constructor(private planetService: PlanetService) {
    this.searchTerms = new Subject<string>();
  }

  ngOnInit(): void {
    this.planets$ = this.searchTerms.pipe(
      // tap(term => console.log(`term: ${term}`)),
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.planetService.searchPlanets(term))
    );
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    // console.log(term);
    // console.log(this.planets$);
    this.searchTerms.next(term);
    // console.log(this.searchTerms);
    // console.log(this.searchTerms.next);
  }
}
