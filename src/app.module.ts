import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RegisterModule } from './Domain/user/modules/register/register.module';
import {MongooseModule} from '@nestjs/mongoose';
import { LoginModule } from './Domain/user/modules/login/login.module';
import { UserListModule } from './Domain/admin/modules/usersList/usersList.module';
import { ConfigModule } from '@nestjs/config';
import { SuperAdminVerifyMiddleware } from './Domain/admin/middlewares/Superadmin.middleware';
import { middlewareGateway } from './database/gateways/middlewareGateway';
import { DataBase } from './database/database.handler';
import { UserSchema } from './database/schema/User';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RegisterModule,
    MongooseModule.forRoot('mongodb+srv://jaseelta111:mvW6wA1yX7WhnhPY@cluster0.swxijv6.mongodb.net/sest'),
    LoginModule,
    UserListModule,
    MongooseModule.forFeature([
      {
        name: 'User',
        schema:UserSchema,
    }
  ]),
  ],providers:[middlewareGateway,DataBase]
 
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SuperAdminVerifyMiddleware).forRoutes('Superadmin');
  }
}

