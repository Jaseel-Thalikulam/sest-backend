
import {Injectable } from '@nestjs/common';
import { mongooseAdminRepository } from 'src/infrastructure/database/repositories/mongooseAdminRepository';


@Injectable()
export class UserListService {
  private readonly _AdminRepository: mongooseAdminRepository;
  constructor(AdminRepository: mongooseAdminRepository){
    this._AdminRepository = AdminRepository;
  }
  public async getAllUsers() {
    try {
      console.log("get all user superadmin -service")
      const usersArray = await this._AdminRepository.getAllUsers()
        

      return usersArray.filter(user => user.role === 'Learn' || user.role === 'Lead');

    } catch (err) {
      console.log(err)
    }

  }
  public async userAccess(id: string) {
    try {
      
      const data = await this._AdminRepository.changeUserAccess(id);
      return { success: true, message: "Success", data };

    } catch (err){

      console.log(err, "from userlist");

      return { success: false, message: "Unauthorized" };
    }
  }

}
