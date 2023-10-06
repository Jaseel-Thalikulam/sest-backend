import { CategoryDto } from '../DTO/Category.dto';
import { CategoryService } from '../../common/services/category.service';
import { UserListService } from './services/userList/usersList.service';
import { Response } from 'express';
import { EditCategoryDto } from '../DTO/EditCategoryDto';
export default class UserListController {
    private userlistservice;
    private categoryservice;
    constructor(userlistservice: UserListService, categoryservice: CategoryService);
    getAllUser(res: Response): Promise<Response<any, Record<string, any>>>;
    userAccess(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    unlistCategory(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllCategory(res: Response): Promise<Response<any, Record<string, any>>>;
    addCategory(Category: CategoryDto, res: Response): Promise<Response<any, Record<string, any>>>;
    updateCategory(Category: EditCategoryDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
