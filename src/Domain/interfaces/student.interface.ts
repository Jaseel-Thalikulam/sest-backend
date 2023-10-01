import { TutorIdDto } from 'src/infrastructure/core/student/DTO/tutorIdDTO';
import User from '../entity/user.entity';

interface IStudentRepository {
  getAlltutors(): Promise<User[]>;
  getTutor(userId: TutorIdDto): Promise<User>;
}

export default IStudentRepository;
