import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {VehicleService} from './service/vehicle.service';
import { LoadingDimmerComponent } from './loading-dimmer/loading-dimmer.component';
import {FilterService} from './service/filter.service';
import { RetryModalComponent } from './retry-modal/retry-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingDimmerComponent,
    RetryModalComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [FormBuilder, VehicleService, FilterService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
