import {Product} from './product';

export interface Orderline {
  uId: string;
  product: Product;
  amount: number;
}
