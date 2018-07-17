import {Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  @HostBinding('class') classes = 'fourteen wide column';

  @Input() error = null;

  constructor() {
    console.log(this.error);
  }

  refreshBrowser(): void {
    window.location.reload();
  }

}
