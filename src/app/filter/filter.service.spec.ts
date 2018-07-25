// Test Helpers for the service tests
import {inject, TestBed} from '@angular/core/testing';
import {FilterService} from './filter.service';

describe('FilterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterService]
    });
  });

  it('has an emtpy filter variable, that can be set from the outside and be read from the outside',
    inject([FilterService], (filterService) => {
      expect(filterService.filters).toBeUndefined();

      const filter = {
        type: 'car',
        brand: 'Lamborghini Reventon',
        color: 'orange',
      };

      filterService.filters = filter;

      expect(filterService.filters).toBe(filter);
    }));

  it('can check for empty filter values',
    inject([FilterService], (filterService) => {
      const filter = {
        type: '',
        brand: '',
        color: '',
      };

      filterService.filters = filter;

      expect(filterService.isFilterEmpty()).toBeTruthy();
    }));

  it('can check for any empty filter values',
    inject([FilterService], (filterService) => {
      const filter = {
        type: 'car',
        brand: '',
        color: '',
      };

      filterService.filters = filter;

      expect(filterService.isFilterEmpty()).toBeTruthy();
    }));

  it('can check for not empty filter values',
    inject([FilterService], (filterService) => {
      const filter = {
        type: 'car',
        brand: 'Lamborghini Reventon',
        color: 'orange',
      };

      filterService.filters = filter;

      expect(filterService.isFilterEmpty()).toBeFalsy();
    }));

  it('can check for empty TYPE value',
    inject([FilterService], (filterService) => {
      const filter = {
        type: ''
      };

      filterService.filters = filter;

      expect(filterService.isTypeEmpty()).toBeTruthy();
    }));

  it('can check for not empty TYPE value',
    inject([FilterService], (filterService) => {
      const filter = {
        type: 'car'
      };

      filterService.filters = filter;

      expect(filterService.isTypeEmpty()).toBeFalsy();
    }));

  it('can check for empty TYPE value',
    inject([FilterService], (filterService) => {
      const filter = {
        color: ''
      };

      filterService.filters = filter;

      expect(filterService.isColorEmpty()).toBeTruthy();
    }));

  it('can check for not empty COLOR value',
    inject([FilterService], (filterService) => {
      const filter = {
        color: 'red'
      };

      filterService.filters = filter;

      expect(filterService.isColorEmpty()).toBeFalsy();
    }));

  it('can check for empty BRAND value',
    inject([FilterService], (filterService) => {
      const filter = {
        brand: ''
      };

      filterService.filters = filter;

      expect(filterService.isBrandEmpty()).toBeTruthy();
    }));

  it('can check for not empty BRAND value',
    inject([FilterService], (filterService) => {
      const filter = {
        brand: 'Lamborghini Reventon'
      };

      filterService.filters = filter;

      expect(filterService.isBrandEmpty()).toBeFalsy();
    }));


});
