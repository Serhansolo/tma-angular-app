import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {VehicleService} from './service/vehicle.service';
import {FilterService} from './service/filter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Create Formgroup for our vehicle filters
  filterGroup: FormGroup;

  constructor(private fb: FormBuilder, public vService: VehicleService, public selectedFilters: FilterService) {
    console.log(this.selectedFilters);
  }

  ngOnInit() {
    this.filterGroup = this.fb.group({
      'vehicle_type': [''],
      'vehicle_brand': [''],
      'vehicle_color': ['']
    });
    this.selectedFilters.setFilters({
      type: this.filterGroup.controls['vehicle_type'].value,
      brand: this.filterGroup.controls['vehicle_brand'].value,
      color: this.filterGroup.controls['vehicle_color'].value
    });
    // console.log(this.selectedFilters);
    this.vService.updateSelectedFilters(this.selectedFilters);

    this.onChanges();
    // this.vService.setSelectedType(this.filterGroup.controls['vehicle_type'].value);
    // this.vService.setSelectedBrand(this.filterGroup.controls['vehicle_brand'].value);
    // this.vService.setSelectedColor(this.filterGroup.controls['vehicle_color'].value);
  }

  onChanges(): void {
    this.filterGroup.valueChanges.subscribe((formResults) => {
      this.selectedFilters.setFilters({
        type: formResults.vehicle_type,
        brand: formResults.vehicle_brand,
        color: formResults.vehicle_color
      });
      this.vService.updateSelectedFilters(this.selectedFilters);
      this.vService.makeLists();
    });
  }

  resetSelected(formControl: FormControl): void {
    formControl.setValue('');
  }
}
