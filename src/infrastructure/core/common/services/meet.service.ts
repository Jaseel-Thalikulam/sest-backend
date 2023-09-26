import { Injectable } from '@nestjs/common';
import createJitsiMeetToken from 'src/Domain/usecase/common/meet/createJitsiMeetToken';
import { JitsiMeetDataDTO } from '../DTO/meet/JistimeetDTO';

@Injectable()
export class MeetService {
  private readonly _createJitsiMeetToken: createJitsiMeetToken;
  constructor(createJitsiMeetToken: createJitsiMeetToken) {
    this._createJitsiMeetToken = createJitsiMeetToken;
  }

  public async generateToken(meetData: JitsiMeetDataDTO) {
    return await this._createJitsiMeetToken.execute(meetData);
  }
}
