import {EventContext} from 'firebase-functions';
import {OrderController} from './order.controller';
import {OrderService} from './order.service';
import {Order} from '../models/order';

export class OrderControllerFirebase implements OrderController {

  constructor(private orderService: OrderService) {}

  execute(snap: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>, context: EventContext): Promise<Order> {
    const order = snap.data() as Order;
    order.uId = context.params.orderId;
    return this.orderService.executeOrder(order);
  }
}
