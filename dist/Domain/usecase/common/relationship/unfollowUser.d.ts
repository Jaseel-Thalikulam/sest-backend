import { FollowDTO } from 'src/infrastructure/core/student/DTO/UserIdDTO';
import { mongooseRelationshipRepository } from 'src/infrastructure/database/repositories/relationship/mongooseRelationshipRepository';
declare class unFollowUser_UseCase {
    private _relationshipRepository;
    constructor(relationshipRepository: mongooseRelationshipRepository);
    execute(UsersId: FollowDTO): Promise<void>;
}
export default unFollowUser_UseCase;
