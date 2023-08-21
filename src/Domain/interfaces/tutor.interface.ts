import { TutorCategoryDTO } from 'src/infrastructure/core/tutor/dto/insertCategoryDTO';
import IUserSlice from './updatedUrl.interface';

interface ITutorRepository {
  addCategory(category: TutorCategoryDTO): Promise<IResponseaddCategory>;
  removeCategory(category: TutorCategoryDTO);
}

export default ITutorRepository;

export interface IResponseaddCategory {
  success: boolean;
  message: string;
  tutordata?: IUserSlice;
}
