import {DataTestHelper} from './data.test.helper';
import {IMock, It, Mock} from 'moq.ts';
import {ProductRepository} from '../../src/products/product.repository';
import {OrderRepository} from '../../src/orders/order.repository';
import {StockRepository} from '../../src/stock/stock.repository';


export class RepositoryTestHelper {
  constructor(private db: DataTestHelper) {}
  getProductRepositoryMock(): IMock<ProductRepository> {
    return new Mock<ProductRepository>()
      .setup(repo => repo.create(this.db.product1))
      .returns(Promise.resolve(this.db.product1));
  }

  getOrderRepositoryMock(): IMock<OrderRepository> {
    return new Mock<OrderRepository>();
  }

  getStockRepositoryMock(): IMock<StockRepository> {
    return new Mock<StockRepository>()
      .setup(stockRepo => stockRepo.create(this.db.product1, 5))
      .returns(Promise.resolve(this.db.stock1))
      .setup(stockRepo => stockRepo.lowerStock(It.IsAny(), It.IsAny()))
      .returns(Promise.resolve())
      .setup(stockRepo => stockRepo.lowerStocks(It.IsAny()))
      .returns(Promise.resolve());
  }


}
