import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { MongooseModule} from '@nestjs/mongoose';
import { UserSchema } from '../../schema/User';
import { registerGateway} from '../../database/gateways/registerGateway';
import { DataBase } from '../../database/database.handler';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema:UserSchema,
    }
  ]),

  ],
  controllers: [RegisterController],
  providers: [RegisterService,registerGateway,DataBase]
})
export class  RegisterModule {}
