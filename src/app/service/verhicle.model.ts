// To keep things readable and expectable defining a class for every
// major type inside an app seems a logic step to take.
// The model class itself seems pretty self-explanatory to me.
export class Vehicle {
  private _id: number;
  private _brand: string;
  private _colors: string[];
  private _img: string;
  private _type: string;

  constructor(id: number, brand: string, colors: string[], img: string, type: string) {
    this.id = id;
    this.brand = brand;
    this.colors = colors;
    this.img = img;
    this.type = type;
  }

  // Getter, Setters, Issers & Hassers
  get id(): number {
    return this._id;
  }

  set id(newId: number) {
    this._id = newId;
  }

  get brand(): string {
    return this._brand;
  }

  set brand(newBrand: string) {
    this._brand = newBrand;
  }

  get colors(): string[] {
    return this._colors;
  }

  set colors(newColors: string[]) {
    this._colors = newColors;
  }

  get img(): string {
    return this._img;
  }

  set img(newImg: string) {
    this._img = newImg;
  }

  get type(): string {
    return this._type;
  }

  set type(newType: string) {
    this._type = newType;
  }
}
