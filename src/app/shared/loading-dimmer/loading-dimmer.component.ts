import {Component, Input} from '@angular/core';

/**
 * Loading Dimmer component is used whenever the app is 'thinking' (loading some data);
 */
@Component({
  selector: 'app-loading-dimmer',
  templateUrl: './loading-dimmer.component.html',
  styleUrls: ['./loading-dimmer.component.css']
})
export class LoadingDimmerComponent {
  /**
   * Boolean value to change the visibility of the loading dimer
   * @type {boolean}
   */
  @Input() loading = true;
}
