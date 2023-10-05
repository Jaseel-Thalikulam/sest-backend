import User from '../entity/user.entity';
interface IAdminRepository {
    getAllUsers(): Promise<User[]>;
    changeUserAccess(id: string): Promise<User | boolean>;
}
export default IAdminRepository;
