import {Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  @HostBinding('class') classes = 'fourteen wide column';

  @Input() error: any = null;

  // Force refresh the browser with plain JS, I could not fix the retry block of the Observable!
  // I like to learn that during our interview!
  // But this works, so Meh!
  refreshBrowser(): void {
    window.location.reload();
  }

  // No getters and setters here... this was just to simple :)
}
