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
