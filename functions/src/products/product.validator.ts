import {Product} from '../models/product';

export class ProductValidator {
  validateData(product: Product) {
    if (!product.name || product.name === '') {
      throw new TypeError('Product needs a Name');
    }
  }
}
