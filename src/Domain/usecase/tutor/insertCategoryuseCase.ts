import { TutorCategoryDTO } from 'src/infrastructure/core/tutor/dto/insertCategoryDTO';
import { mongooseTutorRepository } from '../../../infrastructure/database/repositories/tutor/mongoosetutorRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
class insertTutorCategoryuseCase {
  private tutorRepository: mongooseTutorRepository;
  constructor(tutorRepository: mongooseTutorRepository) {
    this.tutorRepository = tutorRepository;
  }

  async execute(insertionData: TutorCategoryDTO) {
    return await this.tutorRepository.addCategory(insertionData);
  }
}

export default insertTutorCategoryuseCase;
