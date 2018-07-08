import {Component, OnInit} from '@angular/core';
import {Vehicle} from './models/vehicle';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Mock Items
  vehicles: Vehicle[];

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

  constructor(private fb: FormBuilder) {
    this.vehicles = [
      new Vehicle(0, 'Bugatti Veyron', ['red', 'green', 'orange'], '', 'car'),
      new Vehicle(1, 'Boeing 787 Dreamliner', ['yellow', 'blue', 'orange'], '', 'airplane'),
      new Vehicle(2, 'Canadair North Star', ['black', 'yellow', 'blue', 'white', 'orange'], '', 'airplane'),
      new Vehicle(3, 'USRA 0-6-6', ['black', 'orange', 'grey'], '', 'train'),
    ];
  }

  ngOnInit() {
    this.filterGroup = this.fb.group({
      'vehicle_type': ['none'],
      'vehicle_brand': ['none'],
      'vehicle_color': ['none']
    });
    this.selectedType = this.filterGroup.controls.vehicle_type.value;
    this.selectedBrand = this.filterGroup.controls.vehicle_brand.value;
    this.selectedColor = this.filterGroup.controls.vehicle_color.value;
    this.makeLists();
    this.onChanges();
  }

  onChanges(): void {
    this.filterGroup.valueChanges.subscribe((formResults) => {
      this.selectedType = formResults.vehicle_type;
      this.selectedBrand = formResults.vehicle_brand;
      this.selectedColor = formResults.vehicle_color;
      console.log(formResults);
    });
  }

  /** Call listmaker for all the needed attributes.
   *  Clean the arrays by making every item unique. these arrays will populate the radiobuttons for the filter
   */
  makeLists() {
    this.types = this.listAttributes(this.vehicles, this.types, 'type');
    this.brands = this.listAttributes(this.vehicles, this.brands, 'brand');
    this.colors = this.listAttributes(this.vehicles, this.colors, 'colors');
    console.log(this.types);
    console.log(this.brands);
    console.log(this.colors);
  }

  // Make lists form attributes of the Vehicle Array
  listAttributes(vehicleList: Vehicle[], attributeArray: any[], attribute: string): any[] {
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
    tempArr.unshift('none'); // first item is always none for UX purposes

    return tempArr.filter((item, itemIndex, me) => itemIndex === me.indexOf(item));
  }
}
