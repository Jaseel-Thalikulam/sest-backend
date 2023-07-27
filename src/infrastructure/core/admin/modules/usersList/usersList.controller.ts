import { Body, Controller, Get, Post, Res,Req } from '@nestjs/common'; 
import { UserListService } from './usersList.service';
import { Response, Request } from 'express';
import { ObjectId } from 'mongoose';


@Controller('/Superadmin/userslist')
export default class UserListController {
    
    constructor(private userlistservice: UserListService) { }

  @Get()
    
    async getAllUser( @Res() res: Response) {
      console.log("get all user superadmin -controller")

      const response = await this.userlistservice.getAllUsers();
        return res.json({ success: true,data:response});
  }
  
  @Post('blockuser')
  async userAccess(@Body() id :string,@Req() req: Request ,@Res() res: Response) {

  
   
    

    const response = await this.userlistservice.userAccess(id)

    console.log(response);
    

    if (response.success) {
      
      return res.json({ success: true,data:response.data,message:response.message});
    } else {
      return res.json({ success: false,message:response.message});
      
    }
  
  }

   
}



