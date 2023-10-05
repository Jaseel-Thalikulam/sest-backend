import { mongooseUserRepository } from '../../../infrastructure/database/repositories/common/mongooseUserRepository';
import { LoginDto } from '../../../infrastructure/core/common/DTO/login.dto';
declare class verifyLoginUserUseCase {
    private userRepository;
    constructor(userRepository: mongooseUserRepository);
    execute(user: LoginDto): Promise<{
        success: boolean;
        message: string;
        data: import("../../entity/user.entity").default;
        token: any;
    } | {
        success: boolean;
        message: string;
        data?: undefined;
        token?: undefined;
    }>;
}
export default verifyLoginUserUseCase;
