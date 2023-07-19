import { Body, Controller, Get, Res } from '@nestjs/common'; 
import { UserListService } from './usersList.service';
import { Response } from 'express';


@Controller('userslist')
export class UserListController {
    
    constructor(private userlistservice: UserListService) { }

    @Get()
    async getAllUser( @Res() res: Response) {
        console.log("get all users at controller")

      const response = await this.userlistservice.getAllUsers();
   
        console.log(response);
        
    
        return res.json({ success: true,data:response});


    }

   
}



