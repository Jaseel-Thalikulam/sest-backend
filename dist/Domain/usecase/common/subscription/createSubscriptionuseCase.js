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
const common_1 = require("@nestjs/common");
const mongooseSubscriptionRepository_1 = require("../../../../infrastructure/database/repositories/subscription/mongooseSubscriptionRepository");
let createSubscription_useCase = class createSubscription_useCase {
    constructor(subscriptionRepository) {
        this.subscriptionRepository = subscriptionRepository;
    }
    async execute(SubscriptionDetails) {
        const { StudentId, amount, TutorId } = SubscriptionDetails;
        const expiryDate = new Date();
        if (amount === 2000) {
            SubscriptionDetails.Name == 'Base Subscription Plan';
            SubscriptionDetails.SubscribedTime = new Date();
            expiryDate.setMonth(expiryDate.getMonth() + 2);
            SubscriptionDetails.Expirytime = expiryDate;
            return await this.subscriptionRepository.createSubscription(SubscriptionDetails);
        }
        else if (amount === 8000) {
            SubscriptionDetails.Name == 'Standard Subscription Plan';
            SubscriptionDetails.SubscribedTime = new Date();
            expiryDate.setMonth(expiryDate.getMonth() + 10);
            SubscriptionDetails.Expirytime = expiryDate;
            return await this.subscriptionRepository.createSubscription(SubscriptionDetails);
        }
        else if (amount === 15000) {
            SubscriptionDetails.Name == 'Premium Subscription Plan';
            SubscriptionDetails.SubscribedTime = new Date();
            SubscriptionDetails.IsLifeTime = true;
            return await this.subscriptionRepository.createSubscription(SubscriptionDetails);
        }
    }
};
createSubscription_useCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mongooseSubscriptionRepository_1.mongooseSubscriptionRepository])
], createSubscription_useCase);
exports.default = createSubscription_useCase;
//# sourceMappingURL=createSubscriptionuseCase.js.map