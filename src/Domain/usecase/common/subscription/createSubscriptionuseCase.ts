import { mongooseUserRepository } from 'src/infrastructure/database/repositories/common/mongooseUserRepository';
import { Injectable } from '@nestjs/common';
import { searchQueryDTO } from 'src/infrastructure/core/common/DTO/search/searchQuerydto';
import { mongooseSubscriptionRepository } from 'src/infrastructure/database/repositories/subscription/mongooseSubscriptionRepository';
import { SubscriptionDTO } from 'src/infrastructure/core/common/DTO/subscription/subscriptionDto';
import Subscription from 'src/Domain/entity/subscription.entity';
@Injectable()
class createSubscription_useCase {
  private subscriptionRepository: mongooseSubscriptionRepository;
  constructor(subscriptionRepository: mongooseSubscriptionRepository) {
    this.subscriptionRepository = subscriptionRepository;
  }

  async execute(SubscriptionDetails: SubscriptionDTO) {
    const { StudentId, amount, TutorId } = SubscriptionDetails;
    const expiryDate = new Date();

    if (amount === 2000) {
      SubscriptionDetails.Name == 'Base Subscription Plan';
      SubscriptionDetails.SubscribedTime = new Date();
      expiryDate.setMonth(expiryDate.getMonth() + 2);
      SubscriptionDetails.Expirytime = expiryDate;

      return await this.subscriptionRepository.createSubscription(
        SubscriptionDetails,
      );
    } else if (amount === 8000) {
      SubscriptionDetails.Name == 'Standard Subscription Plan';
      SubscriptionDetails.SubscribedTime = new Date();
      expiryDate.setMonth(expiryDate.getMonth() + 10);
      SubscriptionDetails.Expirytime = expiryDate;

      return await this.subscriptionRepository.createSubscription(
        SubscriptionDetails,
      );
    } else if (amount === 15000) {
      SubscriptionDetails.Name == 'Premium Subscription Plan';
      SubscriptionDetails.SubscribedTime = new Date();
      SubscriptionDetails.IsLifeTime = true;
      return await this.subscriptionRepository.createSubscription(
        SubscriptionDetails,
      );
    }
  }
}

export default createSubscription_useCase;
