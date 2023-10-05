import User from '../../../../Domain/entity/user.entity';
import Relationship from 'src/Domain/entity/relationship.entity';
import { Model } from 'mongoose';
import { FollowDTO } from 'src/infrastructure/core/student/DTO/UserIdDTO';
import { IRelationship } from 'src/Domain/interfaces/IRelationship';
export declare class mongooseRelationshipRepository implements IRelationship {
    private readonly userModel;
    private readonly relationshipModel;
    constructor(userModel: Model<User>, relationshipModel: Model<Relationship>);
    isFollowed(UsersId: FollowDTO): Promise<boolean>;
    handlefollow(UsersId: FollowDTO): Promise<void>;
    handleUnfollow(UsersId: FollowDTO): Promise<void>;
    fetchAllFollowingUsers(userId: string): Promise<string[]>;
    fetchAllFollowers(userId: string): Promise<string[]>;
}
