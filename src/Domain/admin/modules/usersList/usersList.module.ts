import { Module } from '@nestjs/common';
import { UserListController } from './usersList.controller';
import { UserListService } from './usersList.service';
import { MongooseModule} from '@nestjs/mongoose';
import { UserSchema } from '../../../../database/schema/User';
import { userListGateway} from '../../../../database/gateways/userListGateway';
import { DataBase } from '../../../../database/database.handler';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema:UserSchema,
    }
  ]),

  ],
  controllers: [UserListController],
  providers: [UserListService,userListGateway,DataBase]
})
export class  UserListModule {}
