import { ObjectId } from 'mongoose';

class Video {
  public _id!: ObjectId;
  public Title: string;
  public URL: string;
  public CourseId: string;
  public PublisherId: string;
  public ThumbnailURL: string;
  constructor(
    Title: string,
    URL: string,
    CourseId: string,
    PublisherId: string,
    ThumbnailURL: string,
  ) {
    this.Title = Title;
    this.URL = URL;
    this.CourseId = CourseId;
    this.PublisherId = PublisherId;
  }
}

export default Video;
