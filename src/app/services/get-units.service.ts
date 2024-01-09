import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UnitsResponse } from '../types/units-response.interface';
import { Location } from '../types/location.interface';
@Injectable({
  providedIn: 'root',
})

export class GetUnitsService {
  // behaviorSubject é um sujeito que espera por mudanças, podemos implementar o seu valor através do método get a qualquer momento
  private allUnitsSubject: BehaviorSubject<Location[]> = new BehaviorSubject<Location[]>([]);
  // transforma o subject em um observable para que possamos observar suas mudanças 
  private allUnits$: Observable<Location[]> = this.allUnitsSubject.asObservable();
  // vai receber os dados filtrados 
  private filteredUnits: Location[] = [];

  readonly apiUrl: string = 'https://test-frontend-developer.s3.amazonaws.com/data/locations.json';


  constructor(private httpClient: HttpClient) {
    this.httpClient.get<UnitsResponse>(this.apiUrl).subscribe(data => {
      // o próxima valor de allUnitsSubject será o data.locations
      this.allUnitsSubject.next(data.locations)
      this.filteredUnits = data.locations
    })
  }

  getAllUnits(): Observable<Location[]> {
    return this.allUnits$
  }

  getFilteredUnits(){
    return this.filteredUnits;
  }

  setFilteredUnits(value: Location[]) {
    this.filteredUnits = value;
  }

}
