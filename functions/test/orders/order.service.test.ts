import {DataTestHelper} from '../helpers/data.test.helper';
import {RepositoryTestHelper} from '../helpers/repository.test.helper';
import {StockRepository} from '../../src/stock/stock.repository';
import {IMock, Times} from 'moq.ts';
import {OrderRepository} from '../../src/orders/order.repository';
import {OrderService} from '../../src/orders/order.service';


describe('OrderService', () => {
  let dataTestHelper: DataTestHelper;
  let repositoryTestHelper: RepositoryTestHelper;
  let stockRepository: IMock<StockRepository>;
  let orderRepository: IMock<OrderRepository>;
  let orderService: OrderService;
  beforeEach(() => {
    dataTestHelper = new DataTestHelper();
    repositoryTestHelper = new RepositoryTestHelper(dataTestHelper);
    orderRepository = repositoryTestHelper.getOrderRepositoryMock();
    stockRepository = repositoryTestHelper.getStockRepositoryMock();
    orderService = new OrderService(orderRepository.object(), stockRepository.object());
  });


});
