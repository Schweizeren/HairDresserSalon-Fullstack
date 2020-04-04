import {ProductController} from './products/product.controller';
import {ProductControllerFirebase} from './products/product.controller.firebase';
import {ProductRepositoryFirebase} from './products/product.repository.firebase';
import {ProductRepository} from './products/product.repository';
import {ProductService} from './products/product.service';
import {StockRepositoryFirebase} from './stock/stock.repository.firebase';
import {StockRepository} from './stock/stock.repository';
import {OrderController} from './orders/order.controller';
import {OrderRepository} from './orders/order.repository';
import {OrderRepositoryFirebase} from './orders/order.repository.firebase';
import {OrderService} from './orders/order.service';
import {OrderControllerFirebase} from './orders/order.controller.firebase';

export class DependencyFactory {
  getProductController(): ProductController {
    const repoProduct: ProductRepository = new ProductRepositoryFirebase();
    const repoStock: StockRepository = new StockRepositoryFirebase();
    const service: ProductService = new ProductService(repoProduct, repoStock);
    return new ProductControllerFirebase(service);
  }

  getOrderController(): OrderController {
    const orderRepository: OrderRepository = new OrderRepositoryFirebase();
    const stockRepository: StockRepository = new StockRepositoryFirebase();
    const service: OrderService = new OrderService(orderRepository, stockRepository);
    return new OrderControllerFirebase(service);
  }

}
