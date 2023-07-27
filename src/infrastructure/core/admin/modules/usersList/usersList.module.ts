import { Module } from '@nestjs/common';
import UserListController from './usersList.controller';
import { UserListService } from './usersList.service';
import { MongooseModule} from '@nestjs/mongoose';
import { UserSchema } from 'src/infrastructure/database/schema/User';
import { mongooseAdminRepository } from 'src/infrastructure/database/repositories/mongooseAdminRepository';
import { mongooseMiddlewareRepository } from 'src/infrastructure/database/repositories/mongooseMiddlewareRepository';


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
  providers: [UserListService,mongooseAdminRepository]
})
export class  UserListModule {}
