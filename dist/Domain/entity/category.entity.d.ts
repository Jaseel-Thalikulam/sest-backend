import { ObjectId } from 'mongoose';
declare class Category {
    _id: ObjectId;
    Name: string;
    Description: string;
    IsListed: boolean;
    constructor(Name: string, Description: string);
}
export default Category;
