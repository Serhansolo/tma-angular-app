import {Injectable} from '@angular/core';
import {Vehicle} from './verhicle.model';
import * as trafficMeister from '../../assets/tm-data/index.js';
import {Observable} from 'rxjs/index';
import {FilterService} from '../filter/filter.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  // a Container of Vehicles
  vehicles: Vehicle[] = [];
  // The chosen vehicle. This is being initiated once all Filter fields are filled.
  vehicleChoice: Vehicle;

  // Make lists to use in app, also initialize them directly
  private types: string[] = [];
  private brands: string[] = [];
  private colors: string[] = [];

  // Some self explanatory vars for the datafetcher
  private error = null;
  private loading = true;
  private attempt = 0;
  private maxAttempts = 3;

  // Doing some initting and fetching the data right away.
  constructor(private selectedFilters: FilterService) {
    this.tryGettingVehicles();
  }

  // I find it the job of a service to collect data  and catch errors if they occur
  // If it does get the data, its also the job of the Service to keep track of the data and do some logic thing on them
  tryGettingVehicles(): void {
    // get the subscription so we can unsubscribe when we are done.
    const subscription = this.getVehiclesObservable()
    // subscribe to the Observable
      .subscribe(
        // If data is resolved then: Yay! Do the logic
        (data) => {
          // Put data inside a variable for later reference
          this.vehicles = data;
          // Make the list right away after successful fetching
          this.makeLists();
        },
        // Sometimes shit happens, try to be aware of that fact.
        (err) => {
          if (this.trying()) {
            this.tryGettingVehicles();
            this.raiseAttempts();
          } else {
            this.loading = false;
            this.error = err;
          }
          subscription.unsubscribe();
        },
        () => {
          this.loading = false;
          subscription.unsubscribe();
        }
      );
  }

  // Call the List Maker to create the filterable Lists
  // The list Maker cleans the arrays by making every item unique. these arrays will populate the Radio Buttons
  // for the filter this function is also called when the filters are changed, if the result of the change
  // is one item  then that's the selected item.
  makeLists() {
    this.types = this.listAttributes(this.filterDataList(), this.types, 'type');
    this.brands = this.listAttributes(this.filterDataList(), this.brands, 'brand');
    this.colors = this.listAttributes(this.filterDataList(), this.colors, 'colors');
    // console.log(this.filterDataList().length);
    if (this.filterDataList().length === 1) {
      this.filterDataList().map(vehicle => this.vehicleChoice = vehicle);
    } else {
      this.vehicleChoice = null;
    }
  }

  // Make the lists and return a string array with the values that will populate the Radio Buttons
  // @Param vehicleList: a list of vehicle object to iterate through whilst getting the values for the list
  // @Param attributeArray: A list of strings to hold the values for the Radio Buttons.
  // @Param attribute: A selector for the key that will be used to get the items for the attributeArray
  listAttributes(vehicleList: Vehicle[], attributeArray: string[], attribute: string): string[] {
    attributeArray = [];
    // Iterate through the object and push the items to the array.
    vehicleList.forEach((vehicle: Vehicle) => {
      attributeArray.push(vehicle[attribute]);
    });
    // remove any duplicate values, who needs that...?
    return this.cleanDuplicates(attributeArray);
  }

  // Just a method to filter the main vehicles array according to the parameter that were chosen in the filters
  filterDataList(): Vehicle[] {
    return this.vehicles.filter((vehicle: Vehicle) => {
      const typeCondition = vehicle.type === this.selectedFilters.filters.type || this.selectedFilters.isTypeEmpty();
      const brandCondition = vehicle.brand === this.selectedFilters.filters.brand || this.selectedFilters.isBrandEmpty();
      const colorCondition = vehicle.colors.filter((color) => color === this.selectedFilters.filters.color).length > 0 || this.selectedFilters.isColorEmpty();
      return typeCondition && brandCondition && colorCondition;
    });
  }

  // Clean duplicates in the lists with Array.filter and sort them alphabetically at the end, a little UX friendlier
  cleanDuplicates(arr: any[]): any[] {
    let tempArr = [];
    if (Array.isArray(arr[0])) {
      arr.forEach((colorArr) => {
        colorArr.forEach((color) => {
          tempArr.push(color);
        });
      });
    } else {
      tempArr = arr;
    }
    tempArr.sort();
    return tempArr.filter((item, itemIndex, me) => itemIndex === me.indexOf(item));
  }

  // get the vehicleObservable
  getVehiclesObservable(): Observable<Vehicle[]> {
    // Since the data API is a callback API I create an observable attach the observer to it and call next on it
    // when the data from the callback function is returned. Otherwise I throw an error that is being checked for
    // by the 'Global Error Component'
    return Observable.create((observer) => {
      trafficMeister.fetchData((err, data) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(data as Vehicle[]);
        }
        observer.complete();
      });
    });
  }

  hasError(): any {
    return this.error;
  }

  isLoading(): boolean {
    return this.loading;
  }

  trying(): boolean {
    return this.attempt !== this.maxAttempts;
  }

  raiseAttempts(): void {
    this.attempt++;
  }
}
