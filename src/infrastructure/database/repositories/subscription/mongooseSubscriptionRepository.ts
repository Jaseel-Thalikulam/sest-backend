import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import Subscription from 'src/Domain/entity/subscription.entity';
import { ISubscription } from 'src/Domain/interfaces/ISubscription';
import { SubscriptionDTO } from 'src/infrastructure/core/common/DTO/subscription/subscriptionDto';
import User from 'src/Domain/entity/user.entity';
import { PaymentDTO } from 'src/infrastructure/core/common/DTO/payment/paymentDTO';
import { getSubscriptionDetailDTO } from 'src/infrastructure/core/common/DTO/subscription/getSubscriptionDetailDTO';
const ObjectId = mongoose.Types.ObjectId;
export class mongooseSubscriptionRepository implements ISubscription {
  constructor(
    @InjectModel('Subscription')
    private readonly subscriptionModel: Model<Subscription>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async createSubscription(SubscriptionDetails: SubscriptionDTO) {
    const newSubscription = new this.subscriptionModel({
      Expirytime: SubscriptionDetails.Expirytime,
      IsLifeTime: SubscriptionDetails.IsLifeTime,
      Name: SubscriptionDetails.Name,
      StudentID: SubscriptionDetails.StudentId,
      SubscribedTime: SubscriptionDetails.SubscribedTime,
      TutorID: SubscriptionDetails.TutorId,
    });

    return newSubscription.save();
  }

  async addSubscriptiontoUser(subscriptionId: ObjectId, StudentId: string) {
    await this.userModel.updateOne(
      { _id: StudentId },
      { $push: { subscription: subscriptionId } },
    );

    return { success: true };
  }

  async DeleteExpiredSubscription(subscriptionId: ObjectId) {
    await this.subscriptionModel.findByIdAndDelete(subscriptionId);
    return { success: false, plan: 'No Active Subscription' };
  }
  async isAlreadySubscribed(PaymentDetails: PaymentDTO) {
    const Data = await this.subscriptionModel.findOne({
      StudentID: PaymentDetails.StudentId,
      TutorID: PaymentDetails.TutorId,
    });

    return Data ? true : false;
  }

  async getSubscriptionData(SubscriptionDetail: getSubscriptionDetailDTO) {
    return await this.subscriptionModel.findOne({
      StudentID: SubscriptionDetail.StudentId,
      TutorID: SubscriptionDetail.TutorId,
    });
  }
}
