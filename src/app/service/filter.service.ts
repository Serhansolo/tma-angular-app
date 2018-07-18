import {Injectable} from '@angular/core';
import {IFilter} from './filter';

// This service is just a collection of parameters being set with the help of an interface.
// I find using this technique easy because I only have to set the filters in one place and share that information.
// Everything in here seems pretty self explanatory to me.
@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private _filter: IFilter;

  // Getter, Setters, Issers & Hassers
  get type(): IFilter['type'] {
    return this._filter.type;
  }

  get brand(): IFilter['brand'] {
    return this._filter.brand;
  }

  get color(): IFilter['color'] {
    return this._filter.color;
  }

  get isEmpty(): boolean {
    return (this._filter.type === '' || this._filter.color === '' || this._filter.brand === '');
  }

  get isTypeEmpty(): boolean {
    return (this._filter.type === '');
  }

  get isBrandEmpty(): boolean {
    return (this._filter.brand === '');
  }

  get isColorEmpty(): boolean {
    return (this._filter.color === '');
  }

  set filters(filter: IFilter) {
    this._filter = filter;
  }

  get filters(): IFilter {
    return this._filter;
  }
}
