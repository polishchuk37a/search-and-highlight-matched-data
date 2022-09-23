import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Car} from "../interfaces/car";
import {filter, map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  carsData = 'assets/data/mock-cars/cars.json';

  constructor(private readonly http: HttpClient) { }

  getMockedData(): Observable<Car> {
    return this.http.get<Car>(this.carsData);
  }
}
