import {Injectable} from '@angular/core';
import {IFilter} from './filter';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private type: string;
  private brand: string;
  private color: string;

  constructor() { }

  getType(): string {
    return this.type;
  }

  getBrand(): string {
    return this.brand;
  }

  getColor(): string {
    return this.color;
  }

  isEmpty(): boolean {
    return (this.type === '' || this.color === '' || this.brand === '');
  }

  isTypeEmpty(): boolean {
    return (this.type === '');
  }

  isBrandEmpty(): boolean {
    return (this.brand === '');
  }

  isColorEmpty(): boolean {
    return (this.color === '');
  }

  setFilters(filter: IFilter) {
    this.type = filter.type;
    this.brand = filter.brand;
    this.color = filter.color;
  }
}
