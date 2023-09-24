import User from '../../../../Domain/entity/user.entity';
import Relationship from 'src/Domain/entity/relationship.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FollowDTO } from 'src/infrastructure/core/student/DTO/UserIdDTO';

// import IRelationshipRepository from 'src/Domain/interfaces/IRelationshipRepository';

export class mongooseRelationshipRepository {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    @InjectModel('RelationShip')
    private readonly relationshipModel: Model<Relationship>,
  ) {}

  async isFollowed(UsersId: FollowDTO) {
    const query = {
      source: UsersId.followedBy,
      target: UsersId.following,
    };

    const relationship = await this.relationshipModel.findOne(query);
    return relationship !== null;
  }

  async handlefollow(UsersId: FollowDTO) {
    const relationship = new this.relationshipModel({
      source: UsersId.followedBy,
      target: UsersId.following,
    });

    await relationship.save();
    console.log('Followed Successfully');
  }

  async handleUnfollow(UsersId: FollowDTO) {
    const query = {
      source: UsersId.followedBy,
      target: UsersId.following,
    };

    const result = await this.relationshipModel.deleteOne(query);

    if (result.deletedCount === 1) {
      console.log('Unfollowed successfully');
    }
  }

  async fetchAllFollowingUsers(userId: string) {
    const query = {
      source: userId,
    };

    const followingUsers = await this.relationshipModel
      .find(query)
      .populate('target');

    return followingUsers.map((relationship) => relationship.target);
  }
  async fetchAllFollowers(userId: string) {
    const query = {
      target: userId,
    };

    const folloingUsers = await this.relationshipModel
      .find(query)
      .populate('source');

    return folloingUsers.map((relationship) => relationship.source);
  }
}
