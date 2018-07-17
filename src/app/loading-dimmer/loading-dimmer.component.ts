import {Component, Input} from '@angular/core';

@Component({
  selector: 'loading-dimmer',
  templateUrl: './loading-dimmer.component.html',
  styleUrls: ['./loading-dimmer.component.css']
})
export class LoadingDimmerComponent {
  @Input() loading = true;

  constructor() {}
}
