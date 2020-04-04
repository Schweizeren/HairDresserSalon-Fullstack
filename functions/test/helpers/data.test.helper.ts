import {Product} from '../../src/models/product';
import {Stock} from '../../src/models/stock';
import {Order} from '../../src/models/order';
import {Orderline} from '../../src/models/orderline';

export class DataTestHelper {
  product1: Product = {
    name: 'Product 1',
    uId: 'p1',
    url: 'somewhere.com',
    price: 22,
    timesPurchased: 0
  };

  product2: Product = {
    name: 'Product 2',
    uId: 'p2',
    url: 'somewhereelse.com',
    price: 23,
    timesPurchased: 0
  };

  stock1: Stock = {
    count: 1,
    product: this.product1
  };

  ol1: Orderline = {
    uId: 'ol1',
    product: this.product1,
    amount: 1
  };

  ol2: Orderline = {
    uId: 'ol2',
    product: this.product2,
    amount: 2
  };

  order1: Order = {
    uId: 'o1',
    date: Date.now(),
    orderLines: [this.ol1],
    visible: false
  };

  order2: Order = {
    uId: 'o2',
    date: Date.now(),
    orderLines: [this.ol1, this.ol2],
    visible: false
  };
}
