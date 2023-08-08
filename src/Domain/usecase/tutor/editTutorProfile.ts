import { mongooseTutorRepository } from '../../../infrastructure/database/repositories/tutor/mongoosetutorRepository';
import { TutorProfileDto } from '../../../infrastructure/core/tutor/dto/tutorProfileDTO';
import { Injectable } from '@nestjs/common';

@Injectable()
class edit_Tutor_Profile {
  private tutorRepository: mongooseTutorRepository;
  constructor(tutorRepository: mongooseTutorRepository) {
    this.tutorRepository = tutorRepository;
  }

  async execute(data: TutorProfileDto) {
    return await this.tutorRepository.UpdateProfile(data);
  }
}

export default edit_Tutor_Profile;
