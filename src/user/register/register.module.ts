import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { MongooseModule} from '@nestjs/mongoose';
import { UserSchema } from '../schema/User';


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
  providers: [RegisterService]
})
export class  RegisterModule {}
