import {Product} from '../models/product';
import {Stock} from '../models/stock';
import {Orderline} from '../models/orderline';

export interface StockRepository {
  create(product: Product, number: number): Promise<Stock>;

  lowerStock(product: Product, amount: number): Promise<void>;

  lowerStocks(orderLines: Orderline[]): Promise<void>;

  setProductName(product: Product): Promise<any>;

  deleteStock(uId: string): Promise<any>;
}
