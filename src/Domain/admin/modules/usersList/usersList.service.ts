
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

         return this._userListGateway.getAllUsers()
            

        } catch (err) {
            console.log(err)
        }
  }
  
 
}
