"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongooseSubscriptionRepository = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const mongoose_3 = require("mongoose");
const ObjectId = mongoose_3.default.Types.ObjectId;
let mongooseSubscriptionRepository = exports.mongooseSubscriptionRepository = class mongooseSubscriptionRepository {
    constructor(subscriptionModel, userModel) {
        this.subscriptionModel = subscriptionModel;
        this.userModel = userModel;
    }
    async createSubscription(SubscriptionDetails) {
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
    async addSubscriptiontoUser(subscriptionId, StudentId) {
        await this.userModel.updateOne({ _id: StudentId }, { $push: { subscription: subscriptionId } });
        return { success: true };
    }
    async DeleteExpiredSubscription(subscriptionId) {
        await this.subscriptionModel.findByIdAndDelete(subscriptionId);
        return { success: false, plan: 'No Active Subscription' };
    }
    async isAlreadySubscribed(PaymentDetails) {
        const Data = await this.subscriptionModel.findOne({
            StudentID: PaymentDetails.StudentId,
            TutorID: PaymentDetails.TutorId,
        });
        return Data ? true : false;
    }
    async getSubscriptionData(SubscriptionDetail) {
        return await this.subscriptionModel.findOne({
            StudentID: SubscriptionDetail.StudentId,
            TutorID: SubscriptionDetail.TutorId,
        });
    }
};
exports.mongooseSubscriptionRepository = mongooseSubscriptionRepository = __decorate([
    __param(0, (0, mongoose_2.InjectModel)('Subscription')),
    __param(1, (0, mongoose_2.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], mongooseSubscriptionRepository);
//# sourceMappingURL=mongooseSubscriptionRepository.js.map