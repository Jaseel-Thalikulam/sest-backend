import { ProfileDto } from '../../../infrastructure/core/common/DTO/tutorProfileDTO';
import { mongooseUserRepository } from 'src/infrastructure/database/repositories/common/mongooseUserRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
class edit_Profile_useCase {
  private userRepository: mongooseUserRepository;
  constructor(userRepository: mongooseUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(data: ProfileDto) {
    return await this.userRepository.UpdateProfile(data);
  }
}

export default edit_Profile_useCase;
