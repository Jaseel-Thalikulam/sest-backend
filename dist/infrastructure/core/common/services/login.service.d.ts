import { LoginDto } from '../DTO/login.dto';
import verifyLoginUserUseCase from '../../../../Domain/usecase/common/user/loginUser';
export declare class LoginService {
    private readonly _verifyLoginUserUseCase;
    constructor(verifyLoginUserUseCase: verifyLoginUserUseCase);
    verifyUser(User: LoginDto): Promise<{
        success: boolean;
        message: string;
        token: any;
        data: import("../../../../Domain/entity/user.entity").default;
    }>;
}
