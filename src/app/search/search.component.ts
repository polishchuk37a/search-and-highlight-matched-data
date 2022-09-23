import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Subject} from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap,
  take,
  takeUntil,
  tap
} from "rxjs/operators";
import {MockDataService} from "../services/mock-data.service";
import {CarsData} from "../interfaces/cars-data";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  carsArray: CarsData['cars'] = [];
  searchCarControl = new FormControl('');
  searchValue = '';

  private unsubscribe$ = new Subject<void>();

  constructor(private readonly mockDataService: MockDataService) { }

  ngOnInit(): void {
    this.searchCarControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(500),
        switchMap(searchValue => {
          this.searchValue = searchValue;

          return this.mockDataService.getMockedData();
        }),
        map(value => value.cars.filter(car => car.name.toLowerCase().includes(this.searchValue))),
        tap(value => {
          this.carsArray = value;
        }),
        takeUntil(this.unsubscribe$)
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
