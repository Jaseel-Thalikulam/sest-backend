import { ObjectId } from 'mongoose';

interface IMiddlewareRepository {
  isSuperAdmin(id: ObjectId): Promise<boolean>;
  isTutor(id: ObjectId): Promise<boolean>;
  isStudent(id: ObjectId): Promise<boolean>;
}

export default IMiddlewareRepository;
