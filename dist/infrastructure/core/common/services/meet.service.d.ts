import createJitsiMeetToken from 'src/Domain/usecase/common/meet/createJitsiMeetToken';
import { JitsiMeetDataDTO } from '../DTO/meet/JistimeetDTO';
export declare class MeetService {
    private readonly _createJitsiMeetToken;
    constructor(createJitsiMeetToken: createJitsiMeetToken);
    generateToken(meetData: JitsiMeetDataDTO): Promise<any>;
}
