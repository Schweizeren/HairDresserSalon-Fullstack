import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {EventContext} from 'firebase-functions';
import {Order} from '../models/order';

export interface OrderController {
  execute(snap: DocumentSnapshot, context: EventContext): Promise<Order>;
}
