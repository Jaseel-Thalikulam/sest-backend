import { mongooseUserRepository } from 'src/infrastructure/database/repositories/common/mongooseUserRepository';
import { ConfigService } from '@nestjs/config';
import { JitsiMeetDataDTO } from 'src/infrastructure/core/common/DTO/meet/JistimeetDTO';
declare class createJitsiMeetToken {
    private readonly configService;
    private userRepository;
    constructor(userRepository: mongooseUserRepository, configService: ConfigService);
    execute(meetData: JitsiMeetDataDTO): Promise<any>;
}
export default createJitsiMeetToken;
