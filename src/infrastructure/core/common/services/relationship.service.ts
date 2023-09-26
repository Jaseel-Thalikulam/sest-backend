import { Injectable } from '@nestjs/common';
import followUser_UseCase from 'src/Domain/usecase/common/relationship/followUser';
import unFollowUser_UseCase from 'src/Domain/usecase/common/relationship/unfollowUser';
import { FollowDTO } from 'src/infrastructure/core/student/DTO/UserIdDTO';
import { mongooseRelationshipRepository } from 'src/infrastructure/database/repositories/relationship/mongooseRelationshipRepository';

@Injectable()
export class relationship_Service {
  private readonly _followUser: followUser_UseCase;
  private readonly _unFollowUser: unFollowUser_UseCase;
  private readonly _relationshipRepository: mongooseRelationshipRepository;

  constructor(
    followUser: followUser_UseCase,
    unfollowUser: unFollowUser_UseCase,
    relationShipRepository: mongooseRelationshipRepository,
  ) {
    this._followUser = followUser;
    this._unFollowUser = unfollowUser;
    this._relationshipRepository = relationShipRepository;
  }

  public async handlefollow(UsersId: FollowDTO) {
    const isAlreadyFollowing = await this._relationshipRepository.isFollowed(
      UsersId,
    );

    if (isAlreadyFollowing) {
      this._unFollowUser.execute(UsersId);
    } else {
      this._followUser.execute(UsersId);
    }
  }

  public async isfollowed(UsersId: FollowDTO) {
    return await this._relationshipRepository.isFollowed(UsersId);
  }

  public async fetchAllFollowingUsers(UserId: string) {
    return await this._relationshipRepository.fetchAllFollowingUsers(UserId);
  }
  public async fetchAllFollowers(UserId: string) {
    return await this._relationshipRepository.fetchAllFollowers(UserId);
  }
}
