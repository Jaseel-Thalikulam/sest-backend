import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { MongooseModule} from '@nestjs/mongoose';
import { UserSchema } from '../../schema/User';
import { UserGateway } from '../../database/gateway';
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
  providers: [RegisterService,UserGateway,DataBase]
})
export class  RegisterModule {}
