import { mongooseUserRepository } from 'src/infrastructure/database/repositories/common/mongooseUserRepository';
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { JitsiMeetDataDTO } from 'src/infrastructure/core/common/DTO/meet/JistimeetDTO';
import * as fs from 'fs';

const privatekey = fs.readFileSync('src/private/Key 9_12_2023, 9_33_42 AM.pk');

@Injectable()
class createJitsiMeetToken {
  private userRepository: mongooseUserRepository;

  constructor(
    userRepository: mongooseUserRepository,
    private readonly configService: ConfigService,
  ) {
    this.userRepository = userRepository;
  }

  async execute(meetData: JitsiMeetDataDTO) {
    const options = {
      header: {
        kid: meetData.kid,
        alg: meetData.alg,
      },
    };

    const payload = {
      aud: meetData.aud,
      context: meetData.context,
      iss: meetData.iss,
      room: meetData.room,
      sub: meetData.sub,
      nbf: parseInt(meetData.nbf),
      exp: parseInt(meetData.exp),
    };

    const token = await jwt.sign(
      payload,
      this.configService.getOrThrow('JITSI_PRIVATE_KEY'),
      options,
    );

    return token;
  }
}

export default createJitsiMeetToken;
