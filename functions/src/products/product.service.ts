import { Product } from '../models/product';
import { ProductRepository } from './product.repository';
import {StockRepository} from '../stock/stock.repository';

export class ProductService {
  constructor(private productRepository: ProductRepository, private stockRepository: StockRepository) {}
  async writeProducts(
    prodId: string,
    productBefore: Product,
    productAfter: Product
  ): Promise<void> {
    const times = productBefore.timesPurchased++;
    if (productAfter) {
      return this.productRepository.setTopProducts({
        uId: prodId,
        name: productAfter.name,
        price: productAfter.price,
        url: productAfter.url,
        timesPurchased: times
      });
    } else {
      return this.productRepository.deleteTopProducts(prodId);
    }
  }

  updateTopProduct(
    prodId: string,
    productBefore: Product,
    productAfter: Product): Promise<void> {
    const name = productAfter.name.toUpperCase();
    return this.productRepository.setTopProducts({
      uId: prodId,
      name,
      price: productAfter.price,
      url: productAfter.url,
      timesPurchased: productAfter.timesPurchased,
    });
  }

  async create(product: Product): Promise<Product> {
    await this.stockRepository.create(product, 5);
    return Promise.resolve(product);
  }
}
