import { mongooseUserRepository } from '../../../infrastructure/database/repositories/common/mongooseUserRepository';
import { EmailService } from '../../../infrastructure/utilities/email/email.service';
import { RegisterDto } from '../../../infrastructure/core/common/DTO/register.dto';
import User from '../../entity/user.entity';
declare class createUserUseCase {
    private userRepository;
    private EmailService;
    constructor(userRepository: mongooseUserRepository, EmailService: EmailService);
    execute(user: RegisterDto): Promise<{
        token: any;
        createdUser: User;
    }>;
}
export default createUserUseCase;
