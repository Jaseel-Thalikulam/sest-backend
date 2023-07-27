import { Injectable } from '@nestjs/common';
import { LoginDto } from '../../dto/login.dto';
import verifyLoginUserUseCase from 'src/Domain/usecase/loginUser';

@Injectable()
export class LoginService {
  private readonly _verifyLoginUserUseCase: verifyLoginUserUseCase;
  constructor(verifyLoginUserUseCase: verifyLoginUserUseCase) {
    this._verifyLoginUserUseCase = verifyLoginUserUseCase;
  }
  public async verifyUser(User: LoginDto) {
    try {
      
      const response = await this._verifyLoginUserUseCase.execute(User)

      return {success:response.success,message:response.message,token:response.token,data:response.data}

    } catch (err) {
      console.log(err)
    }
  }


}
