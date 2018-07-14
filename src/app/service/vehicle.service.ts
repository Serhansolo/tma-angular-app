import {Injectable} from '@angular/core';
import {Vehicle} from './verhicle.model';
import * as trafficMeister from '../../assets/tm-data/index.js';
import {Observable, Observer} from 'rxjs/index';
import {FilterService} from './filter.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  // Vehicles Container
  private vehicles: Vehicle[] = [];
  private vehicleChoice: Vehicle;
  private loading: boolean;

  // Make lists to use in app, also initialize them directly
  private types: string[] = [];
  private brands: string[] = [];
  private colors: string[] = [];

  constructor(private selectedFilters: FilterService) {
    this._setLoading(true);

    this.getVehiclesObservable().subscribe((data) => {
      this.setVehicles(data);
      this.makeLists();
      this._setLoading(false);
    });
  }

  getVehiclesObservable(): Observable<Vehicle[]> {
    return new Observable((observer) => trafficMeister.fetchData((err, data) => {
      console.log(err);
      observer.next(data);
    }));
  }

  private _setLoading(loading: boolean) {
    this.loading = loading;
  }

  isLoading(): boolean {
    return this.loading;
  }

  getVehicles(): Vehicle[] {
    return this.vehicles;
  }

  setVehicles(vehicles: Vehicle[]) {
    this.vehicles = vehicles;
  }

  getSelectedFilters(): FilterService {
    return this.selectedFilters;
  }

  updateSelectedFilters(selectedFilters: FilterService) {
    this.selectedFilters = selectedFilters;
  }

  getTypes(): string[] {
    return this.types;
  }

  getBrands(): string[] {
    return this.brands;
  }

  getColors(): string[] {
    return this.colors;
  }

  setVehicleChoice(vehicle: Vehicle) {
    this.vehicleChoice = vehicle;
  }

  getVehicleChoice(): Vehicle {
    return this.vehicleChoice;
  }

  resetVehicleChoice(): void {
    this.vehicleChoice = null;
  }

  /** Call listmaker for all the needed attributes.
   *  Clean the arrays by making every item unique. these arrays will populate the radiobuttons for the filter
   *  This function is also called when the filters are changed, if the restult of the change is 1 item thats the selected item.
   */
  makeLists() {
    this.types = this.listAttributes(this.filterDataList(), this.types, 'type');
    this.brands = this.listAttributes(this.filterDataList(), this.brands, 'brand');
    this.colors = this.listAttributes(this.filterDataList(), this.colors, 'colors');

    if (this.filterDataList().length <= 1) {
      this.filterDataList().map(vehicle => this.setVehicleChoice(vehicle));
    }
  }


  // Make lists form attributes of the Vehicle Array
  listAttributes(vehicleList: Vehicle[], attributeArray: any[], attribute: string): any[] {
    attributeArray = [];
    vehicleList.forEach((vehicle: Vehicle) => {
      attributeArray.push(vehicle[attribute]);
    });
    return this.cleanDuplicates(attributeArray);
  }

  filterDataList(): Vehicle[] {
    return this.getVehicles().filter((vehicle) => {
      const typeCondition = (vehicle.type === this.getSelectedFilters().getType() || this.getSelectedFilters().isTypeEmpty());
      const brandCondition = (vehicle.brand === this.getSelectedFilters().getBrand() || this.getSelectedFilters().isBrandEmpty());
      const colorCondition = (((vehicle.colors.filter((color) => color === this.getSelectedFilters().getColor())).length > 0) || this.getSelectedFilters().isColorEmpty());

      return typeCondition && brandCondition && colorCondition;
    });
  }

  // Clean duplicates in the lists with Array.filter
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
}
