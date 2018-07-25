import {Injectable} from '@angular/core';
import {Filter} from './filter.model';

// This service is just a collection of parameters being set with the help of an interface.
// I find using this technique easy because I only have to set the filters in one place and share that information.
// Everything in here seems pretty self explanatory to me.
@Injectable({
  providedIn: 'root'
})
export class FilterService {
  filters: Filter;

  isFilterEmpty(): boolean {
    return (this.filters.type === '' || this.filters.color === '' || this.filters.brand === '');
  }

  isTypeEmpty(): boolean {
    return (this.filters.type === '');
  }

  isBrandEmpty(): boolean {
    return (this.filters.brand === '');
  }

  isColorEmpty(): boolean {
    return (this.filters.color === '');
  }
}
