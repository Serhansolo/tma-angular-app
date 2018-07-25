// Default imports, thank you almighty CLI
import {NgModule} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';

// The app, durrr...
import {AppComponent} from './app.component';

// App Dependent components and Services
// The Vehicle Service is responsible for most of the data logic.
import {VehicleService} from './vehicle/vehicle.service';
// The filter Service keeps track of the selected filters.
// I thought it was too much of a burden to saddle up the Vehicle service with this
import {FilterService} from './filter/filter.service';

// Loading dimmer Component just tracks if the app is being loaded initially.
import {LoadingDimmerComponent} from './loading-dimmer/loading-dimmer.component';
// Error Component tracks the caught error (just one coming from the api) and shows it in a nice way.
import {ErrorComponent} from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingDimmerComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    // I prefer using ReactiveFormsModule over  working with the FormsModule. because I find it give a little cleaner HTML
    ReactiveFormsModule
  ],
  providers: [
    // using a FormBuilder to initiate and take control of form elements.
    FormBuilder,
    VehicleService,
    FilterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}


//  ███████╗███████╗██████╗ ██╗  ██╗ █████╗ ███╗   ██╗
//  ██╔════╝██╔════╝██╔══██╗██║  ██║██╔══██╗████╗  ██║
//  ███████╗█████╗  ██████╔╝███████║███████║██╔██╗ ██║
//  ╚════██║██╔══╝  ██╔══██╗██╔══██║██╔══██║██║╚██╗██║
//  ███████║███████╗██║  ██║██║  ██║██║  ██║██║ ╚████║
//  ╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝
//
//    ██╗██████╗
//   ██╔╝╚════██╗
//  ██╔╝  █████╔╝
//  ╚██╗  ╚═══██╗
//   ╚██╗██████╔╝
//    ╚═╝╚═════╝
//
//   █████╗ ███╗   ██╗ ██████╗ ██╗   ██╗██╗      █████╗ ██████╗
//  ██╔══██╗████╗  ██║██╔════╝ ██║   ██║██║     ██╔══██╗██╔══██╗
//  ███████║██╔██╗ ██║██║  ███╗██║   ██║██║     ███████║██████╔╝
//  ██╔══██║██║╚██╗██║██║   ██║██║   ██║██║     ██╔══██║██╔══██╗
//  ██║  ██║██║ ╚████║╚██████╔╝╚██████╔╝███████╗██║  ██║██║  ██║
//  ╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝  ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝
//
