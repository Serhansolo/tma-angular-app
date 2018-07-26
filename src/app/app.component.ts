import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {VehicleService} from './vehicle/vehicle.service';
import {FilterService} from './filter/filter.service';
/**
 * @ignore
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Create Form Group for our vehicle filters
  filterGroup: FormGroup;

  // Inject the dependencies to help serve the greater good of this simple but pretty app.
  constructor(private fb: FormBuilder, public vService: VehicleService, public sfService: FilterService) {}

  // On init we initiate the Form Controls in the form group via the Formbuilder.
  ngOnInit() {
    this.filterGroup = this.fb.group({
      'vehicle_type': [''],
      'vehicle_brand': [''],
      'vehicle_color': ['']
    });
    // We also set the newly initiated control values inside the Filter Service
    this.sfService.filters = {
      type: this.filterGroup.controls['vehicle_type'].value,
      brand: this.filterGroup.controls['vehicle_brand'].value,
      color: this.filterGroup.controls['vehicle_color'].value
    };
    // Call onChanges to subscribe to the Form Group value changes observable
    this.trackChanges();
  }

  // Track changes by subscribing the the valueChanges Observable and reset filters whenever a change is triggered
  private trackChanges(): void {
    this.filterGroup.valueChanges.subscribe((formResults) => {

      this.sfService.filters = {
        type: formResults.vehicle_type,
        brand: formResults.vehicle_brand,
        color: formResults.vehicle_color
      };

      // Call the makeList method in Vehicle Service to prepare the different lists for the radio fields
      // The values from the lists are set and kept inside the Service, I find it more logic there since
      // you might want to refer to the same lists from different components and/or services.
      this.vService.makeLists();
    });
  }

  // Resetter for the reset buttons inside the template. All it does is set the value of the Form Control to nothing
  // This will trigger the subscription which will rebuild the lists and in turn those values are returning back
  // inside the Form Controls.
  resetSelected(formControl: FormControl): void {
    formControl.setValue('');
  }

}
