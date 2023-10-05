import { Model, ObjectId } from 'mongoose';
import mongoose from 'mongoose';
import Subscription from 'src/Domain/entity/subscription.entity';
import { ISubscription } from 'src/Domain/interfaces/ISubscription';
import { SubscriptionDTO } from 'src/infrastructure/core/common/DTO/subscription/subscriptionDto';
import User from 'src/Domain/entity/user.entity';
import { PaymentDTO } from 'src/infrastructure/core/common/DTO/payment/paymentDTO';
import { getSubscriptionDetailDTO } from 'src/infrastructure/core/common/DTO/subscription/getSubscriptionDetailDTO';
declare const ObjectId: typeof mongoose.Types.ObjectId;
export declare class mongooseSubscriptionRepository implements ISubscription {
    private readonly subscriptionModel;
    private readonly userModel;
    constructor(subscriptionModel: Model<Subscription>, userModel: Model<User>);
    createSubscription(SubscriptionDetails: SubscriptionDTO): Promise<mongoose.Document<unknown, {}, Subscription> & Subscription & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>>;
    addSubscriptiontoUser(subscriptionId: ObjectId, StudentId: string): Promise<{
        success: boolean;
    }>;
    DeleteExpiredSubscription(subscriptionId: ObjectId): Promise<{
        success: boolean;
        plan: string;
    }>;
    isAlreadySubscribed(PaymentDetails: PaymentDTO): Promise<boolean>;
    getSubscriptionData(SubscriptionDetail: getSubscriptionDetailDTO): Promise<mongoose.Document<unknown, {}, Subscription> & Subscription & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>>;
}
export {};
