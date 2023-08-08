import { Injectable } from '@nestjs/common';
import { TutorCategoryDTO } from '../../dto/insertCategoryDTO';
import insertTutorCategoryuseCase from 'src/Domain/usecase/tutor/insertCategoryuseCase';
import removeTutorCategoryuseCase from 'src/Domain/usecase/tutor/removeCategoryuseCase';
@Injectable()
export class tutor_CategoryService {

    private readonly _insertTutorCategoryuseCase: insertTutorCategoryuseCase
    private readonly _removeTutorCategoryuseCase: removeTutorCategoryuseCase

    constructor(
        insertTutorCategoryuseCase: insertTutorCategoryuseCase,
        removeTutorCategoryuseCase: removeTutorCategoryuseCase
    ) {
        this._insertTutorCategoryuseCase = insertTutorCategoryuseCase; 
        this._removeTutorCategoryuseCase = removeTutorCategoryuseCase;
    }

    public async insertCategory(insertiondata: TutorCategoryDTO) {
        return await this._insertTutorCategoryuseCase.execute(insertiondata);
    }
    public async removeCategory(insertiondata: TutorCategoryDTO) {
        return await this._removeTutorCategoryuseCase.execute(insertiondata);
    }
}
