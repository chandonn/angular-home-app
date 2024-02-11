import { Injectable } from '@angular/core';
import { HousingLocation } from './housing-location';

@Injectable({
  providedIn: 'root'
})

export class HousingService {
  readonly baseUrl: string = "."
  url = 'http://localhost:3000/locations'

  constructor() { }

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url)
    return await data.json() ?? []
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const data = await fetch(this.url)
    const list: HousingLocation[] = await data.json() ?? []

    return list.find(h => h.id === id)
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(`Application received from: ${firstName} ${lastName}, and sent a confirmation to the email: ${email}`)
  }
}
