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
exports.mongooseRelationshipRepository = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let mongooseRelationshipRepository = exports.mongooseRelationshipRepository = class mongooseRelationshipRepository {
    constructor(userModel, relationshipModel) {
        this.userModel = userModel;
        this.relationshipModel = relationshipModel;
    }
    async isFollowed(UsersId) {
        const query = {
            source: UsersId.followedBy,
            target: UsersId.following,
        };
        const relationship = await this.relationshipModel.findOne(query);
        return relationship !== null;
    }
    async handlefollow(UsersId) {
        const relationship = new this.relationshipModel({
            source: UsersId.followedBy,
            target: UsersId.following,
        });
        await relationship.save();
        console.log('Followed Successfully');
    }
    async handleUnfollow(UsersId) {
        const query = {
            source: UsersId.followedBy,
            target: UsersId.following,
        };
        const result = await this.relationshipModel.deleteOne(query);
        if (result.deletedCount === 1) {
            console.log('Unfollowed successfully');
        }
    }
    async fetchAllFollowingUsers(userId) {
        const query = {
            source: userId,
        };
        const followingUsers = await this.relationshipModel
            .find(query)
            .populate('target');
        return followingUsers.map((relationship) => relationship.target);
    }
    async fetchAllFollowers(userId) {
        const query = {
            target: userId,
        };
        const folloingUsers = await this.relationshipModel
            .find(query)
            .populate('source');
        return folloingUsers.map((relationship) => relationship.source);
    }
};
exports.mongooseRelationshipRepository = mongooseRelationshipRepository = __decorate([
    __param(0, (0, mongoose_2.InjectModel)('User')),
    __param(1, (0, mongoose_2.InjectModel)('RelationShip')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], mongooseRelationshipRepository);
//# sourceMappingURL=mongooseRelationshipRepository.js.map