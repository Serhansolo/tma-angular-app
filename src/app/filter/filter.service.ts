import {Injectable} from '@angular/core';
import {Filter} from './filter.model';
/**
 * This service is responsible for tracking the filters and giving helper methods to check for values inside the filters.
 * */
@Injectable({
  providedIn: 'root'
})
export class FilterService {
  /**
   * Filter property that will be set with the Filter values
   */
  filters: Filter;

  /**
   * Checks if the Filter is empty
   * @returns {boolean}
   */
  isFilterEmpty(): boolean {
    return (this.filters.type === '' || this.filters.color === '' || this.filters.brand === '');
  }

  /**
   * Checks if the Filter Type is empty
   * @returns {boolean}
   */
  isTypeEmpty(): boolean {
    return (this.filters.type === '');
  }
  /**
   * Checks if the Filter Brand is empty
   * @returns {boolean}
   */
  isBrandEmpty(): boolean {
    return (this.filters.brand === '');
  }

  /**
   * Checks if the Filter Color is empty
   * @returns {boolean}
   */
  isColorEmpty(): boolean {
    return (this.filters.color === '');
  }
}
