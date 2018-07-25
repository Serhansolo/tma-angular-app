// To keep things readable and expectable defining a class for every
// major type inside an app seems a logic step to take.
// The model class itself seems pretty self-explanatory to me.
export class Vehicle {
  id: number;
  brand: string;
  colors: string[];
  img: string;
  type: string;

  constructor(id: number, brand: string, colors: string[], img: string, type: string) {
    this.id = id;
    this.brand = brand;
    this.colors = colors;
    this.img = img;
    this.type = type;
  }
}
