import { ObjectId } from 'mongoose';
import { PaymentDTO } from 'src/infrastructure/core/common/DTO/payment/paymentDTO';
import { getSubscriptionDetailDTO } from 'src/infrastructure/core/common/DTO/subscription/getSubscriptionDetailDTO';
import { SubscriptionDTO } from 'src/infrastructure/core/common/DTO/subscription/subscriptionDto';

export interface ISubscription {
  createSubscription(SubscriptionDetails: SubscriptionDTO);
  addSubscriptiontoUser(subscriptionId: ObjectId, StudentId: string);
  getSubscriptionData(SubscriptionDetail: getSubscriptionDetailDTO);
  isAlreadySubscribed(PaymentDetails: PaymentDTO);
}
