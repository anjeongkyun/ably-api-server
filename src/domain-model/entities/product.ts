export class Product {
  id?: string;
  name: string;
  thumbnail: string;
  price: number;

  constructor(name: string, thumbnail: string, price: number, id?: string) {
    this.name = name;
    this.thumbnail = thumbnail;
    this.price = price;
    this.id = id;
  }
}
