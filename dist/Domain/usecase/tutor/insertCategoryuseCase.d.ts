import { TutorCategoryDTO } from 'src/infrastructure/core/tutor/dto/insertCategoryDTO';
import { mongooseTutorRepository } from '../../../infrastructure/database/repositories/tutor/mongoosetutorRepository';
declare class insertTutorCategoryuseCase {
    private tutorRepository;
    constructor(tutorRepository: mongooseTutorRepository);
    execute(insertionData: TutorCategoryDTO): Promise<import("../../interfaces/tutor.interface").IResponseaddCategory>;
}
export default insertTutorCategoryuseCase;
