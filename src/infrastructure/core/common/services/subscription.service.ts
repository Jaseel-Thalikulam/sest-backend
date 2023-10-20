import { Injectable } from '@nestjs/common';
import { SubscriptionDTO } from '../DTO/subscription/subscriptionDto';
import createSubscription_useCase from 'src/Domain/usecase/common/subscription/createSubscriptionuseCase';
import { mongooseSubscriptionRepository } from 'src/infrastructure/database/repositories/subscription/mongooseSubscriptionRepository';
import Subscription from 'src/Domain/entity/subscription.entity';
import { PaymentDTO } from '../DTO/payment/paymentDTO';
import { getSubscriptionDetailDTO } from '../DTO/subscription/getSubscriptionDetailDTO';
@Injectable()
export class Subscription_service {
  private readonly createsubscrption_useCase: createSubscription_useCase;
  private readonly subscriptionRepository: mongooseSubscriptionRepository;
  constructor(
    createsubscrption_useCase: createSubscription_useCase,
    subscriptionRepository: mongooseSubscriptionRepository,
  ) {
    this.createsubscrption_useCase = createsubscrption_useCase;
    this.subscriptionRepository = subscriptionRepository;
  }

  async createSubscription(SubscriptionDetails: SubscriptionDTO) {
    const subscriptionDBData: Subscription =
      await this.createsubscrption_useCase.execute(SubscriptionDetails);

    return await this.subscriptionRepository.addSubscriptiontoUser(
      subscriptionDBData._id,
      SubscriptionDetails.StudentId,
    );
  }

  async isAlreadySubscribed(PaymentDetails: PaymentDTO) {
    return this.subscriptionRepository.isAlreadySubscribed(PaymentDetails);
  }

  async getSubscriptionDetail(SubscriptionDetail: getSubscriptionDetailDTO) {
    const subscriptionData: Subscription =
      await this.subscriptionRepository.getSubscriptionData(SubscriptionDetail);

    if (subscriptionData.IsLifeTime) {
      return { success: true, plan: 'Premium' };
    } else {
      const currentDate = new Date();
      if (subscriptionData.Expirytime < currentDate) {
        await this.subscriptionRepository.DeleteExpiredSubscription(
          subscriptionData._id,
        );
      } else {
        return {
          success: true,
          plan: 'Standard/Base',
        };
      }
    }
  }
}
