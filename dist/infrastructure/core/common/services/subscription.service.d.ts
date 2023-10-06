import { SubscriptionDTO } from '../DTO/subscription/subscriptionDto';
import createSubscription_useCase from 'src/Domain/usecase/common/subscription/createSubscriptionuseCase';
import { mongooseSubscriptionRepository } from 'src/infrastructure/database/repositories/subscription/mongooseSubscriptionRepository';
import { PaymentDTO } from '../DTO/payment/paymentDTO';
import { getSubscriptionDetailDTO } from '../DTO/subscription/getSubscriptionDetailDTO';
export declare class Subscription_service {
    private readonly createsubscrption_useCase;
    private readonly subscriptionRepository;
    constructor(createsubscrption_useCase: createSubscription_useCase, subscriptionRepository: mongooseSubscriptionRepository);
    createSubscription(SubscriptionDetails: SubscriptionDTO): Promise<{
        success: boolean;
    }>;
    isAlreadySubscribed(PaymentDetails: PaymentDTO): Promise<boolean>;
    getSubscriptionDetail(SubscriptionDetail: getSubscriptionDetailDTO): Promise<{
        success: boolean;
        plan: string;
    }>;
}
