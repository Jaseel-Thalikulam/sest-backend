import edit_Profile_useCase from '../../../../Domain/usecase/common/user/editProfile';
import { ProfileDto } from '../DTO/tutorProfileDTO';
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
