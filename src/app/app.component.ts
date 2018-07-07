import {Component} from '@angular/core';
import {Vehicle} from './models/vehicle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Mock Items
  vehicles: Vehicle[];

  // Make lists to use in app, also initialize them directly
  brands: string[] = [];
  types: string[] = [];
  colors: string[] = [];

  constructor() {
    this.vehicles = [
      new Vehicle(0, 'Bugatti Veyron', ['red', 'green', 'orange'], '', 'car'),
      new Vehicle(1, 'Boeing 787 Dreamliner', ['yellow', 'blue', 'orange'], '', 'airplane'),
      new Vehicle(2, 'Canadair North Star', ['black', 'yellow', 'blue', 'orange'], '', 'airplane'),
      new Vehicle(3, 'USRA 0-6-6', ['black', 'orange', 'gray'], '', 'train'),
    ];
    const vehicle = new Vehicle();
    this.makeLists();
  }

  /** Call listmaker for all the needed attributes.
   *  Clean the arrays by making every item unique. these arrays will populate the radiobuttons for the filter
   */
  makeLists() {
    this.brands = this.listAttributes(this.vehicles, this.brands, 'brand');
    this.types = this.listAttributes(this.vehicles, this.types, 'type');
    this.colors = this.listAttributes(this.vehicles, this.colors, 'colors');
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

    return tempArr.filter((item, itemIndex, me) => itemIndex === me.indexOf(item));
  }
}
