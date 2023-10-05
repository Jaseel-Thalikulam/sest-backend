import followUser_UseCase from 'src/Domain/usecase/common/relationship/followUser';
import unFollowUser_UseCase from 'src/Domain/usecase/common/relationship/unfollowUser';
import { FollowDTO } from 'src/infrastructure/core/student/DTO/UserIdDTO';
import { mongooseRelationshipRepository } from 'src/infrastructure/database/repositories/relationship/mongooseRelationshipRepository';
export declare class relationship_Service {
    private readonly _followUser;
    private readonly _unFollowUser;
    private readonly _relationshipRepository;
    constructor(followUser: followUser_UseCase, unfollowUser: unFollowUser_UseCase, relationShipRepository: mongooseRelationshipRepository);
    handlefollow(UsersId: FollowDTO): Promise<void>;
    isfollowed(UsersId: FollowDTO): Promise<boolean>;
    fetchAllFollowingUsers(UserId: string): Promise<string[]>;
    fetchAllFollowers(UserId: string): Promise<string[]>;
}
