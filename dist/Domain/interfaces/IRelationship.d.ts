import { FollowDTO } from 'src/infrastructure/core/student/DTO/UserIdDTO';
export interface IRelationship {
    isFollowed(UsersId: FollowDTO): Promise<boolean>;
    handlefollow(UsersId: FollowDTO): Promise<void>;
    handleUnfollow(UsersId: FollowDTO): Promise<void>;
    fetchAllFollowingUsers(userId: string): Promise<string[]>;
    fetchAllFollowers(userId: string): Promise<string[]>;
}
