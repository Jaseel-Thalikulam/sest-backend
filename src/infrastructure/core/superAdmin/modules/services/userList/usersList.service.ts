import { mongooseSuperAdminRepository } from 'src/infrastructure/database/repositories/superadmin/mongooseAdminRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserListService {
  private readonly _AdminRepository: mongooseSuperAdminRepository;
  constructor(AdminRepository: mongooseSuperAdminRepository) {
    this._AdminRepository = AdminRepository;
  }
  public async getAllUsers() {
    try {
      console.log('get all user superadmin -service');
      const usersArray = await this._AdminRepository.getAllUsers();
      return usersArray.filter(
        (user) => user.role === 'Learn' || user.role === 'Lead',
      );
    } catch (err) {
      console.log(err);
    }
  }
  public async userAccess(id: string) {
    try {
      const data = await this._AdminRepository.changeUserAccess(id);
      return { success: true, message: 'Success', data };
    } catch (err) {
      console.log(err, 'from userlist');

      return { success: false, message: 'Unauthorized' };
    }
  }
}
