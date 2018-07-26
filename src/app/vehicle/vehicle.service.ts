import {Injectable} from '@angular/core';
import {Vehicle} from './verhicle.model';
import * as trafficMeister from '../../assets/tm-data/index.js';
import {Observable} from 'rxjs/index';
import {FilterService} from '../filter/filter.service';
/**
 * The Vehicle Service is responsible for most of the data logic.
 * It gets the data, it's also the job of the Service to keep track of the data and do some logic thing on them
 */
@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  /**
   * A Container of Vehicles
   * @type {Array}
   */
  vehicles: Vehicle[] = [];
  /**
   * The chosen vehicle. This variable is being set once all Filter fields are filled.
   * @type {Vehicle}
   */
  vehicleChoice: Vehicle;

  /**
   * List of all unique types for the filter.
   * @ignore
   */
  private types: string[] = [];
  /**
   * List of all unique types for the filter.
   * @ignore
   */
  private brands: string[] = [];

  /**
   * List of all unique brands for the filter.
   * @ignore
   */
  private colors: string[] = [];

  /**
   * Error variable to keep track of the errors
   * @ignore
   */
  private error = null;
  /**
   * Variable to keep track of the loading 'state'
   * @ignore
   */
  private loading = true;
  /**
   * Variable to keep track of the total number of attempts to reconnect after an error
   * @ignore
   */
  private attempt = 0;
  /**
   * Variable to set the maximum number of attempts
   * @ignore
   */
  private maxAttempts = 3;

  /**
   * Construct with injecting the FilterService and try to get the vehicles from the data source right away.
   * @param sfService inject the Filter Service to be up to date with the changed filters
   */
  constructor(private sfService: FilterService) {
    this.tryGettingVehicles();
  }

  /**
   * Try getting the vehicles from the Data source, since this is an Observable we can conveniently subscribe to it and
   * do some stuff on the next(), err() and complete() methods.
   */
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
          if (this.canTry()) {
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

  /**
   * The 'List Maker' cleans the arrays by making every item unique. these arrays will populate the Radio Buttons
   * for the filter this function is also called when the filters are changed, if the result of the change
   * is one item  then that's the selected item.
   */
  makeLists() {
    this.types = this.listAttributes(this.filterDataList(), this.types, 'type');
    this.brands = this.listAttributes(this.filterDataList(), this.brands, 'brand');
    this.colors = this.listAttributes(this.filterDataList(), this.colors, 'colors');

    if (this.filterDataList().length === 1) {
      this.filterDataList().map(vehicle => this.vehicleChoice = vehicle);
    } else {
      this.vehicleChoice = null;
    }
  }


  /**
   * Make the lists and return a string array with the values that will populate the Radio Buttons
   *
   * @Param vehicleList: a list of vehicle object to iterate through whilst getting the values for the list
   * @Param attributeArray: A list of strings to hold the values for the Radio Buttons.
   * @Param attribute: A selector for the key that will be used to get the items for the attributeArray
   * @returns {string[]}
   */
  listAttributes(vehicleList: Vehicle[], attributeArray: string[], attribute: string): string[] {
    attributeArray = [];
    // Iterate through the object and push the items to the array.
    vehicleList.forEach((vehicle: Vehicle) => {
      attributeArray.push(vehicle[attribute]);
    });
    // remove any duplicate values, who needs that...?
    return this.cleanDuplicates(attributeArray);
  }

  /**
   * Just a method to filter the main vehicles array according to the parameter that were chosen in the filters
   */
  filterDataList(): Vehicle[] {
    return this.vehicles.filter((vehicle: Vehicle) => {
      const typeCondition = vehicle.type === this.sfService.filters.type || this.sfService.isTypeEmpty();
      const brandCondition = vehicle.brand === this.sfService.filters.brand || this.sfService.isBrandEmpty();
      const colorCondition = vehicle.colors.filter((color) => color === this.sfService.filters.color).length > 0 || this.sfService.isColorEmpty();
      return typeCondition && brandCondition && colorCondition;
    });
  }

  /**
   * Clean duplicates in the lists with Array.filter and sort them alphabetically at the end, a little UX friendlier.
   * @param arr Provided array to clean dublicates.
   * @returns {any[]}
   */
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

  /**
   * Get the vehicleObservable to subscribe on. This method creates and Observabble, fetches the data, waits for
   * the callback function to react and then reply accordingly by nexting or erroring
   *
   * @returns {Observable<Vehicle[]>}
   */
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

  /**
   * This function return an error of any type so the outside world can read it an act accordingly
   * @returns {any}
   */
  hasError(): any {
    return this.error;
  }

  /**
   * This function returns the loading boolean 'state'
   * @returns {boolean}
   */
  isLoading(): boolean {
    return this.loading;
  }

  /**
   * this function returns a boolean check to see if we can try again or the maximum atempts are reached.
   * @ignore
   */
  private canTry(): boolean {
    return this.attempt !== this.maxAttempts;
  }

  /**
   * This function raises the attemptnumber when a try fails.
   * @ignore
   */
  private raiseAttempts(): void {
    this.attempt++;
  }
}
