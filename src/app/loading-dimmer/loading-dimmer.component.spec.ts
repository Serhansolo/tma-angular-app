import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LoadingDimmerComponent} from './loading-dimmer.component';

// create Host Component to load the dimmer in.
@Component({
  template: `
    <app-loading-dimmer
      [loading]="loading">
    </app-loading-dimmer>`
})
class TestHostComponent {
  loading = true;
}

describe('LoadingDimmerComponent', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let hostElement: HTMLElement;
  let inputVariable: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingDimmerComponent, TestHostComponent]
    });
    // create TestHostComponent instead of DashboardHeroComponent
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    hostElement = fixture.nativeElement.querySelectorAll('app-loading-dimmer');
    fixture.detectChanges(); // trigger initial data binding
  });


  it('should see if the loading dimmer can be turned on and off',
    () => {
      inputVariable = hostElement[0].attributes['ng-reflect-loading'].value;
      expect(inputVariable).toBe('true'); // true on default

      testHost.loading = false;
      fixture.detectChanges(); // trigger data binding

      inputVariable = hostElement[0].attributes['ng-reflect-loading'].value;
      expect(inputVariable).toBe('false'); // set to false
    });
});
