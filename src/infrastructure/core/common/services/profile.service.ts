import edit_Profile_useCase from '../../../../Domain/usecase/common/editProfile';
import { ProfileDto } from '../dto/tutorProfileDTO';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Edit_ProfileService {
  private readonly _edit_Profile_useCase: edit_Profile_useCase;

  constructor(editTutorProfileUseCase: edit_Profile_useCase) {
    this._edit_Profile_useCase = editTutorProfileUseCase;
  }

  public async editProfile(user: ProfileDto) {
    return await this._edit_Profile_useCase.execute(user);
  }
}
