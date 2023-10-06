import { mongooseUserRepository } from '../../database/repositories/common/mongooseUserRepository';
import IemailService from '../../../Domain/utilities/email/interface/email.interface';
import { MailerService } from '@nestjs-modules/mailer';
export declare class EmailService implements IemailService {
    private mailService;
    private readonly _UserRepository;
    constructor(mailService: MailerService, userRepository: mongooseUserRepository);
    SendEmailOTP(toemail: any, Userid: any): Promise<void>;
}
