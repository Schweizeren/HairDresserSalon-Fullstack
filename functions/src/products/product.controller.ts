import {Product} from '../models/product';
import {Change, EventContext} from 'firebase-functions';
import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';

export interface ProductController {
  writtenProducts(snap: Change<DocumentSnapshot>, context: EventContext): Promise<void>;

  updatedTopProduct(snap: Change<DocumentSnapshot>, context: EventContext): Promise<void>;

  create(snap: DocumentSnapshot, context: EventContext): Promise<Product>;
}
