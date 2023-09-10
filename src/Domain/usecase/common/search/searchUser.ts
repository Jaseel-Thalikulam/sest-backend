import { mongooseUserRepository } from 'src/infrastructure/database/repositories/common/mongooseUserRepository';
import { Injectable } from '@nestjs/common';
import { searchQueryDTO } from 'src/infrastructure/core/common/DTO/search/searchQuerydto';

@Injectable()
class search_Query_useCase {
  private userRepository: mongooseUserRepository;
  constructor(userRepository: mongooseUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(data: searchQueryDTO) {
    if (data.option === 'Playlist') {
    } else if (data.option === 'Student') {
      return await this.userRepository.findStudentsByUserId(data);
    } else if (data.option === 'Tutor') {
      return await this.userRepository.findTutorsByUserId(data);
    }
  }
}

export default search_Query_useCase;
