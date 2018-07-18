import {Component, Input} from '@angular/core';

@Component({
  selector: 'loading-dimmer',
  templateUrl: './loading-dimmer.component.html',
  styleUrls: ['./loading-dimmer.component.css']
})
export class LoadingDimmerComponent {
  // Pretty self explanatory Component. Does nothing else then show a spinner with a
  // parameter that can be set via the input var.
  @Input() loading = true;

  // No getters and setters here... this was just to simple :)
}
