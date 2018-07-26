import {Component, HostBinding, Input} from '@angular/core';
/**
 * Simple Error component to show the errors on a nice reusable way.
 */
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  /**
   * add classes for UX using class bindings.
   */
  @HostBinding('class') classes = 'fourteen wide column';

  /**
   * keep track of the error situation, used input binding to show or hide the error
   * If the error prpperty is set then it will show the error, otherwise it will hide it.
   *
   * @default null
   * @type {any}
   */
  @Input() error: any = null;

  /**Force refresh the browser with plain JS.
   */
  refreshBrowser(): void {
    window.location.reload();
  }
}
