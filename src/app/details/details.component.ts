import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  template: `
    <article>
      <img class="listing-photo" [src]="housingLocation?.photo" alt="Exterior photo of {{ housingLocation?.name }}">
      <section>
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
        <p class="listing-location">{{ housingLocation?.city }}, {{ housingLocation?.state }}</p>
      </section>
      <section>
        <h2 class="section-heading">About the house:</h2>
        <ul>
          <li>Units: {{ housingLocation?.availableUnits }}</li>
          <li>Wifi: {{ housingLocation?.wifi }}</li>
          <li>Laundry: {{ housingLocation?.laundry }}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to get more info about this home</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input type="text"  id="first-name" formControlName="firstName">

          <label for="last-name">Last Name</label>
          <input type="text" id="last-name" formControlName="lastName">

          <label for="email">Email</label>
          <input type="text" id="email" formControlName="email">

          <button class="primary" type="submit">Apply now</button>
        </form>
      </section>
    </article>
  `,
  styleUrl: './details.component.css'
})

export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute)
  housingLocationId = -1
  housingService = inject(HousingService)
  housingLocation: HousingLocation | undefined

  constructor() {
    this.housingLocationId = Number(this.route.snapshot.params['id'])
    this.housingService.getHousingLocationById(this.housingLocationId).then(single => {
      this.housingLocation = single
    })
  }

  applyForm = new FormGroup({
    firstName: new FormControl<string>(''),
    lastName: new FormControl<string>(''),
    email: new FormControl<string>(''),
  })

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    )
  }
}
