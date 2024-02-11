import { Component, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingService } from "../housing.service"
import { NgForOf } from '@angular/common';
import { HousingLocation } from '../housing-location';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HousingLocationComponent,
    NgForOf,
  ],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Search your city" #filter>
        <button
          type="button"
          class="primary"
          (click)="filterResults(filter.value)"
        >
          Search
        </button>
      </form>

      <section class="results">
        <app-housing-location
          *ngFor="let housingLocation of filteredLocationList"
          [housingLocation]="housingLocation">
        </app-housing-location>
      </section>
    </section>
  `,
  styleUrl: './home.component.css'
})

export class HomeComponent {
  housingLocationList: HousingLocation[] = []
  housingService: HousingService = inject(HousingService)
  filteredLocationList: HousingLocation[] = []

  constructor() {
    this.housingService.getAllHousingLocations().then(list => {
      this.housingLocationList = list
      this.filteredLocationList = this.housingLocationList
    })
  }

  filterResults(query: string) {
    if (!query) {
      this.filteredLocationList = this.housingLocationList
    } else {
      this.filteredLocationList = this.housingLocationList.filter(
        h => h?.city.toLowerCase().includes(query.toLowerCase()) || h?.name.toLowerCase().includes(query.toLowerCase())
      )
    }
  }
}
