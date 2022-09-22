import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CarsData} from "../interfaces/cars-data";
import {filter, map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  carsData = 'assets/data/mock-cars/cars.json';

  constructor(private readonly http: HttpClient) { }

  getMockedData(): Observable<CarsData> {
    return this.http.get<CarsData>(this.carsData);
  }
}
