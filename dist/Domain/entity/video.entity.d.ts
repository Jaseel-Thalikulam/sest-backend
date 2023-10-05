import { ObjectId } from 'mongoose';
declare class Video {
    _id: ObjectId;
    Title: string;
    URL: string;
    CourseId: string;
    PublisherId: string;
    ThumbnailURL: string;
    constructor(Title: string, URL: string, CourseId: string, PublisherId: string, ThumbnailURL: string);
}
export default Video;
