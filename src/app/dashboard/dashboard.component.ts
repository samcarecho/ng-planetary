import { Component, OnInit } from '@angular/core';
import {Planet} from '../planet.class';
import {PlanetService} from '../planet.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  planets: Planet[] = [];

  constructor(private planetService: PlanetService) { }

  ngOnInit() {
    this.getPlanets();
  }

  getPlanets(): void {
    this.planetService.getPlanets()
      .subscribe(planets => this.planets = planets.slice(0, 4));
  }
}

