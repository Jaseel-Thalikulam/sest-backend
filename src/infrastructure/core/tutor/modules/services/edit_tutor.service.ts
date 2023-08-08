import edit_Tutor_Profile from '../../../../../Domain/usecase/tutor/editTutorProfile';
import { TutorProfileDto } from '../../dto/tutorProfileDTO';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Edit_tutorService {
  private readonly _editTutorProfileUseCase: edit_Tutor_Profile;

  constructor(editTutorProfileUseCase: edit_Tutor_Profile) {
    this._editTutorProfileUseCase = editTutorProfileUseCase;
  }

  public async editTutorProfile(user: TutorProfileDto) {
    return await this._editTutorProfileUseCase.execute(user);
  }
}
