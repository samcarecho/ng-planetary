import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlanetDetailComponent } from './planet-detail/planet-detail.component';
import { PlanetsComponent } from './planets/planets.component';
import { PlanetSearchComponent } from './planet-search/planet-search.component';
import { MessagesComponent } from './messages/messages.component';




@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    PlanetsComponent,
    PlanetDetailComponent,
    MessagesComponent,
    PlanetSearchComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
