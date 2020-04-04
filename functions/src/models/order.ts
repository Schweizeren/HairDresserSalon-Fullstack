import {Orderline} from './orderline';

export interface Order {
  uId: string;
  date: number;
  orderLines: Orderline[];
  visible: boolean;
}
