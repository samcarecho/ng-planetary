import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Planet } from '../planet.class';
import { PlanetService } from '../planet.service';

@Component({
  selector: 'app-planet-detail',
  templateUrl: './planet-detail.component.html',
  styleUrls: ['./planet-detail.component.css']
})
export class PlanetDetailComponent implements OnInit {

  @Input() planet: Planet;

  constructor(private route: ActivatedRoute,
              private planetService: PlanetService,
              private location: Location) {}

  ngOnInit(): void {
    this.getPlanet();
  }

  getPlanet(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.planetService.getPlanet(id)
      .subscribe(planet => this.planet = planet);
  }

  savePlanet(): void {
    this.planetService.updatePlanet(this.planet)
      .subscribe(() => this.goBack());
  }

  votePlanet(): void {
    this.planetService.votePlanet(this.planet)
      .subscribe(planet => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
