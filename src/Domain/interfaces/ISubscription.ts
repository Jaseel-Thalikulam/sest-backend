import { ObjectId } from 'mongoose';
import { PaymentDTO } from 'src/infrastructure/core/common/DTO/payment/paymentDTO';
import { getSubscriptionDetailDTO } from 'src/infrastructure/core/common/DTO/subscription/getSubscriptionDetailDTO';
import { SubscriptionDTO } from 'src/infrastructure/core/common/DTO/subscription/subscriptionDto';
import Subscription from '../entity/subscription.entity';

export interface ISubscription {
  createSubscription(
    SubscriptionDetails: SubscriptionDTO,
  ): Promise<Subscription>;
  addSubscriptiontoUser(
    subscriptionId: ObjectId,
    StudentId: string,
  ): Promise<{ success: boolean }>;
  getSubscriptionData(
    SubscriptionDetail: getSubscriptionDetailDTO,
  ): Promise<Subscription>;
  isAlreadySubscribed(PaymentDetails: PaymentDTO): Promise<boolean>;
  DeleteExpiredSubscription(
    subscriptionId: ObjectId,
  ): Promise<{ success: boolean; plan: string }>;
}
