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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscription_service = void 0;
const common_1 = require("@nestjs/common");
const createSubscriptionuseCase_1 = require("../../../../Domain/usecase/common/subscription/createSubscriptionuseCase");
const mongooseSubscriptionRepository_1 = require("../../../database/repositories/subscription/mongooseSubscriptionRepository");
let Subscription_service = exports.Subscription_service = class Subscription_service {
    constructor(createsubscrption_useCase, subscriptionRepository) {
        this.createsubscrption_useCase = createsubscrption_useCase;
        this.subscriptionRepository = subscriptionRepository;
    }
    async createSubscription(SubscriptionDetails) {
        const subscriptionDBData = await this.createsubscrption_useCase.execute(SubscriptionDetails);
        return await this.subscriptionRepository.addSubscriptiontoUser(subscriptionDBData._id, SubscriptionDetails.StudentId);
    }
    async isAlreadySubscribed(PaymentDetails) {
        return this.subscriptionRepository.isAlreadySubscribed(PaymentDetails);
    }
    async getSubscriptionDetail(SubscriptionDetail) {
        const subscriptionData = await this.subscriptionRepository.getSubscriptionData(SubscriptionDetail);
        if (subscriptionData.IsLifeTime) {
            return { success: true, plan: 'You are a Premium Student of' };
        }
        else {
            const currentDate = new Date();
            if (subscriptionData.Expirytime < currentDate) {
                await this.subscriptionRepository.DeleteExpiredSubscription(subscriptionData._id);
            }
            else {
                return {
                    success: true,
                    plan: 'Upgrade to Premium for Unlimited access',
                };
            }
        }
    }
};
exports.Subscription_service = Subscription_service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [createSubscriptionuseCase_1.default,
        mongooseSubscriptionRepository_1.mongooseSubscriptionRepository])
], Subscription_service);
//# sourceMappingURL=subscription.service.js.map