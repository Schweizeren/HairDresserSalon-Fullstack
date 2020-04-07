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

  updateStockProductName(
    prodId: string,
    productBefore: Product,
    productAfter: Product): Promise<void> {
    if(productAfter){
      if(!productAfter.name || productAfter.name === ''){
        console.log('order', productAfter);
        throw new TypeError('You need to fill out the name of the product');
        return Promise.reject(productAfter);
      }
      return this.stockRepository.setProductName({
        uId: prodId,
        name: productAfter.name,
        url: productAfter.url,
        price: productAfter.price,
        timesPurchased: productAfter.timesPurchased
      });
    } else {
      return this.stockRepository.deleteStock(prodId);
    }
  }

  async create(product: Product): Promise<Product> {
    await this.stockRepository.create(product, 5);
    return Promise.resolve(product);
  }

  buy(product: Product): Product {
    if(product) {
      product.timesPurchased = product.timesPurchased +1;
      return product;
    }
    return undefined as any;
  }

  refund(product: Product): Product {
    if(product) {
      product.timesPurchased = product.timesPurchased -1;
      return product;
    }
    return undefined as any;
  }
}
