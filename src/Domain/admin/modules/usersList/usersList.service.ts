
import { HttpException, Injectable } from '@nestjs/common';
import { userListGateway } from '../../../../database/gateways/userListGateway';

import { ObjectId } from 'mongoose';

@Injectable()
export class UserListService {
  private readonly _userListGateway: userListGateway;
  constructor(userlistgateway: userListGateway) {
    this._userListGateway = userlistgateway;
  }


  public async getAllUsers() {
    try {
      console.log("get all users at service")

      const usersArray = await this._userListGateway.getAllUsers()

      return usersArray.filter(user => user.role === 'Learn' || user.role === 'Lead');

    } catch (err) {
      console.log(err)
    }

  }
  public async userAccess(id: ObjectId) {
    try {
      
  
      const data = await this._userListGateway.changeUserAccess(id);
      return { success: true, message: "Success", data };
    } catch (err) {
      console.log(err, "from userlist");
      return { success: false, message: "Unauthorized" };
    }
  }

}
