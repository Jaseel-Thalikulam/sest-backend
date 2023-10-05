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
exports.relationship_Service = void 0;
const common_1 = require("@nestjs/common");
const followUser_1 = require("../../../../Domain/usecase/common/relationship/followUser");
const unfollowUser_1 = require("../../../../Domain/usecase/common/relationship/unfollowUser");
const mongooseRelationshipRepository_1 = require("../../../database/repositories/relationship/mongooseRelationshipRepository");
let relationship_Service = exports.relationship_Service = class relationship_Service {
    constructor(followUser, unfollowUser, relationShipRepository) {
        this._followUser = followUser;
        this._unFollowUser = unfollowUser;
        this._relationshipRepository = relationShipRepository;
    }
    async handlefollow(UsersId) {
        const isAlreadyFollowing = await this._relationshipRepository.isFollowed(UsersId);
        if (isAlreadyFollowing) {
            this._unFollowUser.execute(UsersId);
        }
        else {
            this._followUser.execute(UsersId);
        }
    }
    async isfollowed(UsersId) {
        return await this._relationshipRepository.isFollowed(UsersId);
    }
    async fetchAllFollowingUsers(UserId) {
        return await this._relationshipRepository.fetchAllFollowingUsers(UserId);
    }
    async fetchAllFollowers(UserId) {
        return await this._relationshipRepository.fetchAllFollowers(UserId);
    }
};
exports.relationship_Service = relationship_Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [followUser_1.default,
        unfollowUser_1.default,
        mongooseRelationshipRepository_1.mongooseRelationshipRepository])
], relationship_Service);
//# sourceMappingURL=relationship.service.js.map