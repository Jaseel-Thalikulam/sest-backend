
import { HttpException, Injectable } from '@nestjs/common';
import { userListGateway } from '../../../../database/gateways/userListGateway';
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
      let FilteredArray = []
     FilteredArray= usersArray.filter(item => item.role === 'Learn' || item.role === 'Lead');

      return FilteredArray

    } catch (err) {
      console.log(err)
    }
  }


}
