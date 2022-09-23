import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Subject} from "rxjs";
import {debounceTime, finalize, map, startWith, switchMap, takeUntil, tap} from "rxjs/operators";
import {MockDataService} from "../services/mock-data.service";
import {CarInfo} from "../interfaces/car-info";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit, OnDestroy {
  carsArray: CarInfo[] = [];
  searchCarControl = new FormControl('');

  private unsubscribe$ = new Subject<void>();

  constructor(private readonly mockDataService: MockDataService,
              private readonly changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.searchCarControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(500),
        switchMap(() => {
          return this.mockDataService.getMockedData();
        }),
        map(value => value.car.filter(car => car.name.toLowerCase().includes(this.searchCarControl.value))),
        tap(value => {
          this.carsArray = value;
          this.changeDetectorRef.markForCheck();
        }),
        takeUntil(this.unsubscribe$)
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
