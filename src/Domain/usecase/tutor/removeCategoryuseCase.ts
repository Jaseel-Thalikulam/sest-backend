import { TutorCategoryDTO } from 'src/infrastructure/core/tutor/dto/insertCategoryDTO';
import { mongooseTutorRepository } from '../../../infrastructure/database/repositories/tutor/mongoosetutorRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
class removeTutorCategoryuseCase {
  private tutorRepository: mongooseTutorRepository;
  constructor(tutorRepository: mongooseTutorRepository) {
    this.tutorRepository = tutorRepository;
  }

  async execute(deletionData: TutorCategoryDTO) {
    return await this.tutorRepository.removeCategory(deletionData);
  }
}

export default removeTutorCategoryuseCase;
