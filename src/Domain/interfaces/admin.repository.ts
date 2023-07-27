import User from '../entity/user.entity';


interface AdminRepository {
    getAllUsers(): Promise<User[]>
    changeUserAccess(id: string): Promise<User | boolean>
    
}

export default AdminRepository;