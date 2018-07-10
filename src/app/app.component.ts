import {Component, DoCheck, IterableDiffers, OnInit} from '@angular/core';
import {Vehicle} from './models/vehicle';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  // Mock Items
  vehicles: Vehicle[];

  // Thing I need to diff array
  iterableDiffer: IterableDiffers;

  // Create Formgroup for our vehicle filters
  filterGroup: FormGroup;

  // Make lists to use in app, also initialize them directly
  types: string[] = [];
  brands: string[] = [];
  colors: string[] = [];

  // holders for the selected options
  selectedType: string;
  selectedBrand: string;
  selectedColor: string;

  constructor(private fb: FormBuilder, private _iterableDiffers: IterableDiffers) {
    // this.iterableDiffer = this._iterableDiffers.find([]).create(null);
    this.vehicles = [
      new Vehicle(0, 'Bugatti Veyron', ['red', 'green', 'orange'], '', 'car'),
      new Vehicle(1, 'Boeing 787 Dreamliner', ['yellow', 'blue', 'orange'], '', 'airplane'),
      new Vehicle(2, 'Canadair North Star', ['black', 'yellow', 'blue', 'white', 'orange'], '', 'airplane'),
      new Vehicle(3, 'USRA 0-6-6', ['black', 'grey', 'purple'], '', 'train'),
    ];
  }

  ngOnInit() {
    this.filterGroup = this.fb.group({
      'vehicle_type': ['none'],
      'vehicle_brand': ['none'],
      'vehicle_color': ['none']
    });
    this.selectedType = this.filterGroup.controls['vehicle_type'].value;
    this.selectedBrand = this.filterGroup.controls['vehicle_brand'].value;
    this.selectedColor = this.filterGroup.controls['vehicle_color'].value;
    // console.log(this.selectedType);
    this.makeLists(this.vehicles);
    this.onChanges();
  }

  onChanges(): void {
    this.filterGroup.valueChanges.subscribe((formResults) => {
      this.selectedType = formResults.vehicle_type;
      this.selectedBrand = formResults.vehicle_brand;
      this.selectedColor = formResults.vehicle_color;

      this.makeLists(this.filterDataList());

      // console.log(this.filterGroup.controls);
    });
  }

  ngDoCheck() {
    // console.log(this.iterableDiffer.diff(this.));
  }

  filterDataList(): Vehicle[] {
    return this.vehicles.filter((vehicle) => {
      const colorCondition = (((vehicle.colors.filter((color) => color === this.selectedColor)).length > 0) || this.isNone(this.selectedColor));
      const typeCondition = (vehicle.type === this.selectedType || this.isNone(this.selectedType));
      const brandCondition = (vehicle.brand === this.selectedBrand || this.isNone(this.selectedBrand));

      return typeCondition && brandCondition && colorCondition;
    });
  }

  /** Call listmaker for all the needed attributes.
   *  Clean the arrays by making every item unique. these arrays will populate the radiobuttons for the filter
   */
  makeLists(vehicles: Vehicle[]) {
    this.types = this.listAttributes(vehicles, this.types, 'type');
    this.brands = this.listAttributes(vehicles, this.brands, 'brand');
    this.colors = this.listAttributes(vehicles, this.colors, 'colors');
  }

  // Make lists form attributes of the Vehicle Array
  listAttributes(vehicleList: Vehicle[], attributeArray: any[], attribute: string): any[] {
    attributeArray = [];
    vehicleList.forEach((vehicle: Vehicle) => {
      attributeArray.push(vehicle[attribute]);
    });
    return this.cleanDuplicates(attributeArray);
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
    tempArr.unshift('none'); // first item is always none if there is more then 1 item for UX purposes
    return tempArr.filter((item, itemIndex, me) => itemIndex === me.indexOf(item));
  }

  isNone(value: string, ...anyOther: any[]): boolean { // TODO is called twice?
    if (anyOther.length !== 0) {
      anyOther.unshift(value);
      for (let n = 0; n < anyOther.length; n++) {
        if (anyOther[n] === 'none') {
          return true;
        }
      }
      return false;
    } else {
      return value === 'none';
    }
  }

  resetSelected(formControl: FormControl): void {
    formControl.setValue('none');
  }

}
