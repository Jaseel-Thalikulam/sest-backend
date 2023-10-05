import { ObjectId } from 'mongoose';
declare class Course {
    _id: ObjectId;
    Title: string;
    Descripton: string;
    videos: ObjectId[];
    publisherId: ObjectId;
    CoverImage: string;
    Category: string;
    constructor(Title: string, Descripton: string, videos: ObjectId[], publisherId: ObjectId, CoverImage: string, Category: string);
}
export default Course;
