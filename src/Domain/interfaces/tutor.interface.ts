import { TutorCategoryDTO } from 'src/infrastructure/core/tutor/dto/insertCategoryDTO';
import IUserSlice from './updatedUrl.interface';

export default interface ITutorRepository {
  addCategory(category: TutorCategoryDTO): Promise<IResponseaddCategory>;
  removeCategory(category: TutorCategoryDTO): Promise<IResponseaddCategory>;
}



export interface IResponseaddCategory {
  success: boolean;
  message: string;
  tutordata?: IUserSlice;
}
