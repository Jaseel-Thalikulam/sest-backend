import User from '../entity/user.entity';

interface IStudentRepository {
  getAlltutors(): Promise<User[]>;
}

export default IStudentRepository;
