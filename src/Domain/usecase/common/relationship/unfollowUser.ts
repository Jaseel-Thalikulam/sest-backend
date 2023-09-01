import { Injectable } from '@nestjs/common';
import { FollowDTO } from 'src/infrastructure/core/student/DTO/UserIdDTO';
import { mongooseRelationshipRepository } from 'src/infrastructure/database/repositories/relationship/mongooseRelationshipRepository';

@Injectable()
class unFollowUser_UseCase {
  private _relationshipRepository: mongooseRelationshipRepository;

  constructor(relationshipRepository: mongooseRelationshipRepository) {
    this._relationshipRepository = relationshipRepository;
  }

  async execute(UsersId: FollowDTO) {
    this._relationshipRepository.handleUnfollow(UsersId);
  }
}

export default unFollowUser_UseCase;
