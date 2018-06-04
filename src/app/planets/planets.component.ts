import { Component, OnInit } from '@angular/core';
import { Planet } from '../planet.class';
import { PlanetService } from '../planet.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css']
})
export class PlanetsComponent implements OnInit {

  planets: Planet[];

  constructor(private planetService: PlanetService) {
  }

  ngOnInit() {
    this.getPlanets();
  }

  getPlanets(): void {
    this.planetService.getPlanets()
      .subscribe(planets => this.planets = planets);
  }

  addPlanet(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.planetService.addPlanet({ name } as Planet)
      .subscribe(planet => {
        this.planets.push(planet);
      });
  }

  deletePlanet(planet: Planet): void {
    this.planets = this.planets.filter(h => h !== planet);
    this.planetService.deletePlanet(planet).subscribe();
  }
}
