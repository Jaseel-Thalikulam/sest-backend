import { Injectable } from '@nestjs/common';
import { mongooseStudentRepository } from 'src/infrastructure/database/repositories/student/mongooseStudentRepository';
import { TutorIdDto } from '../../DTO/tutorIdDTO';
@Injectable()
export class StudentHomePageService {
  private readonly _studentRepository: mongooseStudentRepository;
  constructor(StudentRepository: mongooseStudentRepository) {
    this._studentRepository = StudentRepository;
  }
  public async getAllTutors() {
    try {
      return await this._studentRepository.getAlltutors();
    } catch (err) {
      console.log(err);
    }
  }
  public async getTutor(userId: TutorIdDto) {
    try {
      return await this._studentRepository.getTutor(userId);
    } catch (err) {
      console.log(err);
    }
  }
}
